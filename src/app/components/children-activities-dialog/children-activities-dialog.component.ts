import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivityTypes } from 'src/app/models/activity-types';
import { Child } from 'src/app/models/child';
import { ChildCourse } from 'src/app/models/child-course';
import { Course } from 'src/app/models/course';
import { Days } from 'src/app/models/days';
import { EarlyCare } from 'src/app/models/early-care';
import { Homework } from 'src/app/models/homework';
import { Lunch } from 'src/app/models/lunch';
import { Pickup } from 'src/app/models/pickup';
import { DbService } from 'src/app/services/db.service';
import { ToastService } from 'src/app/services/toast.service';

const DAYS_MAP = [
  { key: 'Monday', label: 'Montag' },
  { key: 'Tuesday', label: 'Dienstag' },
  { key: 'Wednesday', label: 'Mittwoch' },
  { key: 'Thursday', label: 'Donnerstag' },
  { key: 'Friday', label: 'Freitag' },
];

@Component({
  selector: 'ogs-children-activities-dialog',
  templateUrl: './children-activities-dialog.component.html',
  styleUrls: ['./children-activities-dialog.component.scss'],
})
export class ChildrenActivitiesDialogComponent implements OnInit {
  child!: Child;
  courses!: Course[];
  earlyCare!: EarlyCare[];
  lunch!: Lunch[];
  homework!: Homework[];
  childCourses!: ChildCourse[];
  pickup!: Pickup[];
  activitiesForm!: FormGroup;
  days = Object.keys(Days);
  days2 = Object.values(Days);
  ActivityTypes = ActivityTypes;
  color = '';

  constructor(
    public dbService: DbService,
    public dialogRef: MatDialogRef<ChildrenActivitiesDialogComponent>,
    readonly fb: FormBuilder,
    readonly toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) data: MatDialogConfig
  ) {
    this.child = data as Child;
    this.dbService.courses.subscribe((value) => {
      this.courses = value;
    });
    this.dbService.earlyCare.subscribe((value) => {
      this.earlyCare = value;
    });
    this.dbService.lunch.subscribe((value) => {
      this.lunch = value;
    });
    this.dbService.homework.subscribe((value) => {
      this.homework = value;
    });
    this.dbService.childCourses.subscribe((value) => {
      this.childCourses = value;
    });
    this.dbService.pickup.subscribe((value) => {
      this.pickup = value;
    });
  }

  ngOnInit() {
    this.color = this.hasActivities() ? 'update' : 'create';
    this.init();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    if (this.activitiesForm.valid) {
      const current = { ...this.activitiesForm.getRawValue() };
      current.coursesGroup.childId = this.child.id;

      if (this.hasActivities()) {
        this.updateActivities(current);
        return;
      }

      this.createActivities(current);
    }
  }

  private hasActivities(): boolean {
    return this.earlyCare.some((item) => item.childId === this.child.id);
  }

  private init() {
    const childId = this.child.id;
    const ec = (day: string) => this.earlyCare.filter((i) => i.childId === childId).find((i) => i.day === day);
    const lu = (day: string) => this.lunch.filter((i) => i.childId === childId).find((i) => i.day === day);
    const hw = (day: string) => this.homework.filter((i) => i.childId === childId).find((i) => i.day === day);
    const pu = (day: string) => this.pickup.filter((i) => i.childId === childId).find((i) => i.day === day);
    const childCourses = this.childCourses.filter((item) => item.childId === childId);

    this.activitiesForm = this.fb.group({
      earlyCareGroup: this.fb.group({
        earlyCareParticipationMonday: this.fb.control(ec('Montag')?.participation ?? 1, []),
        earlyCareParticipationTuesday: this.fb.control(ec('Dienstag')?.participation ?? 1, []),
        earlyCareParticipationWednesday: this.fb.control(ec('Mittwoch')?.participation ?? 1, []),
        earlyCareParticipationThursday: this.fb.control(ec('Donnerstag')?.participation ?? 1, []),
        earlyCareParticipationFriday: this.fb.control(ec('Freitag')?.participation ?? 1, []),
        earlyCareStartMonday: this.fb.control(ec('Montag')?.start ?? '1. Stunde', []),
        earlyCareStartTuesday: this.fb.control(ec('Dienstag')?.start ?? '1. Stunde', []),
        earlyCareStartWednesday: this.fb.control(ec('Mittwoch')?.start ?? '1. Stunde', []),
        earlyCareStartThursday: this.fb.control(ec('Donnerstag')?.start ?? '1. Stunde', []),
        earlyCareStartFriday: this.fb.control(ec('Freitag')?.start ?? '1. Stunde', []),
        earlyCareNoteMonday: this.fb.control(ec('Montag')?.note ?? '', []),
        earlyCareNoteTuesday: this.fb.control(ec('Dienstag')?.note ?? '', []),
        earlyCareNoteWednesday: this.fb.control(ec('Mittwoch')?.note ?? '', []),
        earlyCareNoteThursday: this.fb.control(ec('Donnerstag')?.note ?? '', []),
        earlyCareNoteFriday: this.fb.control(ec('Freitag')?.note ?? '', []),
      }),
      lunchGroup: this.fb.group({
        lunchParticipationMonday: this.fb.control(lu('Montag')?.participation ?? 1, []),
        lunchParticipationTuesday: this.fb.control(lu('Dienstag')?.participation ?? 1, []),
        lunchParticipationWednesday: this.fb.control(lu('Mittwoch')?.participation ?? 1, []),
        lunchParticipationThursday: this.fb.control(lu('Donnerstag')?.participation ?? 1, []),
        lunchParticipationFriday: this.fb.control(lu('Freitag')?.participation ?? 1, []),
        lunchNoteMonday: this.fb.control(lu('Montag')?.note ?? '', []),
        lunchNoteTuesday: this.fb.control(lu('Dienstag')?.note ?? '', []),
        lunchNoteWednesday: this.fb.control(lu('Mittwoch')?.note ?? '', []),
        lunchNoteThursday: this.fb.control(lu('Donnerstag')?.note ?? '', []),
        lunchNoteFriday: this.fb.control(lu('Freitag')?.note ?? '', []),
      }),
      homeworkGroup: this.fb.group({
        homeworkParticipationMonday: this.fb.control(hw('Montag')?.participation ?? 1, []),
        homeworkParticipationTuesday: this.fb.control(hw('Dienstag')?.participation ?? 1, []),
        homeworkParticipationWednesday: this.fb.control(hw('Mittwoch')?.participation ?? 1, []),
        homeworkParticipationThursday: this.fb.control(hw('Donnerstag')?.participation ?? 1, []),
        homeworkParticipationFriday: this.fb.control(hw('Freitag')?.participation ?? 1, []),
        homeworkNoteMonday: this.fb.control(hw('Montag')?.note ?? '', []),
        homeworkNoteTuesday: this.fb.control(hw('Dienstag')?.note ?? '', []),
        homeworkNoteWednesday: this.fb.control(hw('Mittwoch')?.note ?? '', []),
        homeworkNoteThursday: this.fb.control(hw('Donnerstag')?.note ?? '', []),
        homeworkNoteFriday: this.fb.control(hw('Freitag')?.note ?? '', []),
      }),
      coursesGroup: this.fb.group({
        courseSelect: this.fb.control(
          childCourses.map(({ courseId }) => courseId),
          []
        ),
      }),
      pickupGroup: this.fb.group({
        pickupTimeMonday: this.fb.control(pu('Montag')?.pickupTime ?? '', []),
        pickupTimeTuesday: this.fb.control(pu('Dienstag')?.pickupTime ?? '', []),
        pickupTimeWednesday: this.fb.control(pu('Mittwoch')?.pickupTime ?? '', []),
        pickupTimeThursday: this.fb.control(pu('Donnerstag')?.pickupTime ?? '', []),
        pickupTimeFriday: this.fb.control(pu('Freitag')?.pickupTime ?? '', []),
        pickupTypeMonday: this.fb.control(pu('Montag')?.pickupType ?? 'Wird abgeholt', []),
        pickupTypeTuesday: this.fb.control(pu('Dienstag')?.pickupType ?? 'Wird abgeholt', []),
        pickupTypeWednesday: this.fb.control(pu('Mittwoch')?.pickupType ?? 'Wird abgeholt', []),
        pickupTypeThursday: this.fb.control(pu('Donnerstag')?.pickupType ?? 'Wird abgeholt', []),
        pickupTypeFriday: this.fb.control(pu('Freitag')?.pickupType ?? 'Wird abgeholt', []),
        pickupNoteMonday: this.fb.control(pu('Montag')?.note ?? '', []),
        pickupNoteTuesday: this.fb.control(pu('Dienstag')?.note ?? '', []),
        pickupNoteWednesday: this.fb.control(pu('Mittwoch')?.note ?? '', []),
        pickupNoteThursday: this.fb.control(pu('Donnerstag')?.note ?? '', []),
        pickupNoteFriday: this.fb.control(pu('Freitag')?.note ?? '', []),
      }),
    });
  }

  private buildActivityItems(
    childId: number,
    current: any
  ): { earlyCare: EarlyCare[]; lunch: Lunch[]; homework: Homework[]; pickup: Pickup[] } {
    const eg = current.earlyCareGroup;
    const lg = current.lunchGroup;
    const hg = current.homeworkGroup;
    const pg = current.pickupGroup;

    return {
      earlyCare: DAYS_MAP.map((d) => ({
        childId,
        day: d.label,
        participation: eg[`earlyCareParticipation${d.key}`] as 0 | 1,
        start: eg[`earlyCareStart${d.key}`] as '1. Stunde' | '2. Stunde',
        note: eg[`earlyCareNote${d.key}`] || undefined,
      })),
      lunch: DAYS_MAP.map((d) => ({
        childId,
        day: d.label,
        participation: lg[`lunchParticipation${d.key}`] as 0 | 1,
        note: lg[`lunchNote${d.key}`] || undefined,
      })),
      homework: DAYS_MAP.map((d) => ({
        childId,
        day: d.label,
        participation: hg[`homeworkParticipation${d.key}`] as 0 | 1,
        note: hg[`homeworkNote${d.key}`] || undefined,
      })),
      pickup: DAYS_MAP.map((d) => ({
        childId,
        day: d.label,
        pickupTime: pg[`pickupTime${d.key}`] || undefined,
        pickupType: pg[`pickupType${d.key}`] as 'Wird abgeholt' | 'Alleine losschicken',
        note: pg[`pickupNote${d.key}`] || undefined,
      })),
    };
  }

  private createActivities(activities: any) {
    const childId = this.child.id!;
    const { earlyCare, lunch, homework, pickup } = this.buildActivityItems(childId, activities);
    this.dbService.createEarlyCare(earlyCare);
    this.dbService.createLunch(lunch);
    this.dbService.createHomework(homework);
    this.dbService.createPickup(pickup);
    const selectedCourses: ChildCourse[] = activities.coursesGroup.courseSelect.map((id: number) => ({
      courseId: id,
      childId: activities.coursesGroup.childId,
    }));
    this.dbService.createChildCourses(selectedCourses);
    this.toastService.showSuccessToast('Speichern erfolgreich', 'Schüler Aktivitäten wurden angelegt.');
    this.closeDialog();
    this.dbService.getEarlyCare();
    this.dbService.getLunch();
    this.dbService.getHomework();
    this.dbService.getChildCourses();
    this.dbService.getPickup();
  }

  private updateActivities(activities: any) {
    const childId = this.child.id!;
    const { earlyCare, lunch, homework, pickup } = this.buildActivityItems(childId, activities);
    this.dbService.updateEarlyCare(earlyCare);
    this.dbService.updateLunch(lunch);
    this.dbService.updateHomework(homework);
    this.dbService.updatePickup(pickup);
    const selectedCourses: ChildCourse[] = activities.coursesGroup.courseSelect.map((id: number) => ({
      courseId: id,
      childId: activities.coursesGroup.childId,
    }));
    this.dbService.updateChildCourses(selectedCourses?.length > 0 ? selectedCourses : (this.child.id as number));
    this.toastService.showSuccessToast('Update erfolgreich', 'Schüler Aktivitäten wurden aktualisiert.');
    this.closeDialog();
    this.dbService.getEarlyCare();
    this.dbService.getLunch();
    this.dbService.getHomework();
    this.dbService.getChildCourses();
    this.dbService.getPickup();
  }
}

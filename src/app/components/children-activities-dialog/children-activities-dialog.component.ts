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
    private fb: FormBuilder,
    private toastService: ToastService,
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
      current.earlyCareGroup.childId = this.child.id;
      current.lunchGroup.childId = this.child.id;
      current.homeworkGroup.childId = this.child.id;
      current.coursesGroup.childId = this.child.id;
      current.pickupGroup.childId = this.child.id;

      if (this.hasActivities()) {
        this.updateActivities(current);
        return;
      }

      this.createActivities(current);
    }
  }

  private hasActivities(): boolean {
    return !!this.earlyCare.find((item) => item.childId === this.child.id);
  }

  private init() {
    const earlyCare = this.earlyCare.find((item) => item.childId === this.child.id);
    const lunch = this.lunch.find((item) => item.childId === this.child.id);
    const homework = this.homework.find((item) => item.childId === this.child.id);
    const childCourses = this.childCourses.filter((item) => item.childId === this.child.id);
    const pickup = this.pickup.find((item) => item.childId === this.child.id);

    this.activitiesForm = this.fb.group({
      earlyCareGroup: this.fb.group({
        earlyCareParticipationMonday: this.fb.control(earlyCare?.earlyCareParticipationMonday ?? 1, []),
        earlyCareParticipationTuesday: this.fb.control(earlyCare?.earlyCareParticipationTuesday ?? 1, []),
        earlyCareParticipationWednesday: this.fb.control(earlyCare?.earlyCareParticipationWednesday ?? 1, []),
        earlyCareParticipationThursday: this.fb.control(earlyCare?.earlyCareParticipationThursday ?? 1, []),
        earlyCareParticipationFriday: this.fb.control(earlyCare?.earlyCareParticipationFriday ?? 1, []),
        earlyCareStartMonday: this.fb.control(earlyCare?.earlyCareStartMonday ?? '1. Stunde', []),
        earlyCareStartTuesday: this.fb.control(earlyCare?.earlyCareStartTuesday ?? '1. Stunde', []),
        earlyCareStartWednesday: this.fb.control(earlyCare?.earlyCareStartWednesday ?? '1. Stunde', []),
        earlyCareStartThursday: this.fb.control(earlyCare?.earlyCareStartThursday ?? '1. Stunde', []),
        earlyCareStartFriday: this.fb.control(earlyCare?.earlyCareStartFriday ?? '1. Stunde', []),
      }),
      lunchGroup: this.fb.group({
        lunchParticipationMonday: this.fb.control(lunch?.lunchParticipationMonday ?? 1, []),
        lunchParticipationTuesday: this.fb.control(lunch?.lunchParticipationTuesday ?? 1, []),
        lunchParticipationWednesday: this.fb.control(lunch?.lunchParticipationWednesday ?? 1, []),
        lunchParticipationThursday: this.fb.control(lunch?.lunchParticipationThursday ?? 1, []),
        lunchParticipationFriday: this.fb.control(lunch?.lunchParticipationFriday ?? 1, []),
        lunchNoteMonday: this.fb.control(lunch?.lunchNoteMonday ?? '', []),
        lunchNoteTuesday: this.fb.control(lunch?.lunchNoteTuesday ?? '', []),
        lunchNoteWednesday: this.fb.control(lunch?.lunchNoteWednesday ?? '', []),
        lunchNoteThursday: this.fb.control(lunch?.lunchNoteThursday ?? '', []),
        lunchNoteFriday: this.fb.control(lunch?.lunchNoteFriday ?? '', []),
      }),
      homeworkGroup: this.fb.group({
        homeworkParticipationMonday: this.fb.control(homework?.homeworkParticipationMonday ?? 1, []),
        homeworkParticipationTuesday: this.fb.control(homework?.homeworkParticipationTuesday ?? 1, []),
        homeworkParticipationWednesday: this.fb.control(homework?.homeworkParticipationWednesday ?? 1, []),
        homeworkParticipationThursday: this.fb.control(homework?.homeworkParticipationThursday ?? 1, []),
        homeworkParticipationFriday: this.fb.control(homework?.homeworkParticipationFriday ?? 1, []),
        homeworkNoteMonday: this.fb.control(homework?.homeworkNoteMonday ?? '', []),
        homeworkNoteTuesday: this.fb.control(homework?.homeworkNoteTuesday ?? '', []),
        homeworkNoteWednesday: this.fb.control(homework?.homeworkNoteWednesday ?? '', []),
        homeworkNoteThursday: this.fb.control(homework?.homeworkNoteThursday ?? '', []),
        homeworkNoteFriday: this.fb.control(homework?.homeworkNoteFriday ?? '', []),
      }),
      coursesGroup: this.fb.group({
        courseSelect: this.fb.control(
          childCourses.map(({ courseId }) => courseId),
          []
        ),
      }),
      pickupGroup: this.fb.group({
        pickupTimeMonday: this.fb.control(pickup?.pickupTimeMonday ?? '', []),
        pickupTimeTuesday: this.fb.control(pickup?.pickupTimeTuesday ?? '', []),
        pickupTimeWednesday: this.fb.control(pickup?.pickupTimeWednesday ?? '', []),
        pickupTimeThursday: this.fb.control(pickup?.pickupTimeThursday ?? '', []),
        pickupTimeFriday: this.fb.control(pickup?.pickupTimeFriday ?? '', []),
        pickupTypeMonday: this.fb.control(pickup?.pickupTypeMonday ?? 'Wird abgeholt', []),
        pickupTypeTuesday: this.fb.control(pickup?.pickupTypeTuesday ?? 'Wird abgeholt', []),
        pickupTypeWednesday: this.fb.control(pickup?.pickupTypeWednesday ?? 'Wird abgeholt', []),
        pickupTypeThursday: this.fb.control(pickup?.pickupTypeThursday ?? 'Wird abgeholt', []),
        pickupTypeFriday: this.fb.control(pickup?.pickupTypeFriday ?? 'Wird abgeholt', []),
        pickupNoteMonday: this.fb.control(pickup?.pickupNoteMonday ?? '', []),
        pickupNoteTuesday: this.fb.control(pickup?.pickupNoteTuesday ?? '', []),
        pickupNoteWednesday: this.fb.control(pickup?.pickupNoteWednesday ?? '', []),
        pickupNoteThursday: this.fb.control(pickup?.pickupNoteThursday ?? '', []),
        pickupNoteFriday: this.fb.control(pickup?.pickupNoteFriday ?? '', []),
      }),
    });
  }

  private createActivities(activities: any) {
    this.dbService.createEarlyCare(activities.earlyCareGroup as EarlyCare);
    this.dbService.createLunch(activities.lunchGroup as Lunch);
    this.dbService.createHomework(activities.homeworkGroup as Homework);
    this.dbService.createPickup(activities.pickupGroup as Pickup);
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
    this.dbService.updateEarlyCare(activities.earlyCareGroup as EarlyCare);
    this.dbService.updateLunch(activities.lunchGroup as Lunch);
    this.dbService.updateHomework(activities.homeworkGroup as Homework);
    this.dbService.updatePickup(activities.pickupGroup as Pickup);
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

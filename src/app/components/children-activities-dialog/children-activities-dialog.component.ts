import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivityTypes } from 'src/app/models/activity-types';
import { Child } from 'src/app/models/child';
import { Course } from 'src/app/models/course';
import { Days } from 'src/app/models/days';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'ogs-children-activities-dialog',
  templateUrl: './children-activities-dialog.component.html',
  styleUrls: ['./children-activities-dialog.component.scss'],
})
export class ChildrenActivitiesDialogComponent implements OnInit {
  child!: Child;
  courses!: Course[];
  activitiesForm!: FormGroup;
  days = Object.keys(Days);
  days2 = Object.values(Days);
  ActivityTypes = ActivityTypes;

  constructor(
    private cdr: ChangeDetectorRef,
    private dbService: DbService,
    public dialogRef: MatDialogRef<ChildrenActivitiesDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: MatDialogConfig
  ) {
    this.child = data as Child;
    this.dbService.courses.subscribe((value) => {
      this.courses = value;
    });
  }

  ngOnInit() {
    this.init();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    if (this.activitiesForm.valid) {
      // const current = { ...this.activitiesForm.getRawValue() };
    }
  }

  private init() {
    this.activitiesForm = this.fb.group({
      earlyCareGroup: this.fb.group({
        earlyCareParticipationMonday: this.fb.control(1, []),
        earlyCareParticipationTuesday: this.fb.control(1, []),
        earlyCareParticipationWednesday: this.fb.control(1, []),
        earlyCareParticipationThursday: this.fb.control(1, []),
        earlyCareParticipationFriday: this.fb.control(1, []),
        earlyCareStartMonday: this.fb.control('1. Stunde', []),
        earlyCareStartTuesday: this.fb.control('1. Stunde', []),
        earlyCareStartWednesday: this.fb.control('1. Stunde', []),
        earlyCareStartThursday: this.fb.control('1. Stunde', []),
        earlyCareStartFriday: this.fb.control('1. Stunde', []),
      }),
      lunchGroup: this.fb.group({
        lunchParticipationMonday: this.fb.control(1, []),
        lunchParticipationTuesday: this.fb.control(1, []),
        lunchParticipationWednesday: this.fb.control(1, []),
        lunchParticipationThursday: this.fb.control(1, []),
        lunchParticipationFriday: this.fb.control(1, []),
        lunchNoteMonday: this.fb.control('', []),
        lunchNoteTuesday: this.fb.control('', []),
        lunchNoteWednesday: this.fb.control('', []),
        lunchNoteThursday: this.fb.control('', []),
        lunchNoteFriday: this.fb.control('', []),
      }),
      homeworkGroup: this.fb.group({
        homeworkParticipationMonday: this.fb.control(1, []),
        homeworkParticipationTuesday: this.fb.control(1, []),
        homeworkParticipationWednesday: this.fb.control(1, []),
        homeworkParticipationThursday: this.fb.control(1, []),
        homeworkParticipationFriday: this.fb.control(1, []),
        homeworkNoteMonday: this.fb.control('', []),
        homeworkNoteTuesday: this.fb.control('', []),
        homeworkNoteWednesday: this.fb.control('', []),
        homeworkNoteThursday: this.fb.control('', []),
        homeworkNoteFriday: this.fb.control('', []),
      }),
      coursesGroup: this.fb.group({
        courseSelect: this.fb.control('', []),
      }),
      pickupGroup: this.fb.group({
        pickupTimeMonday: this.fb.control('', []),
        pickupTimeTuesday: this.fb.control('', []),
        pickupTimeWednesday: this.fb.control('', []),
        pickupTimeThursday: this.fb.control('', []),
        pickupTimeFriday: this.fb.control('', []),
        pickupTypeMonday: this.fb.control('Wird abgeholt', []),
        pickupTypeTuesday: this.fb.control('Wird abgeholt', []),
        pickupTypeWednesday: this.fb.control('Wird abgeholt', []),
        pickupTypeThursday: this.fb.control('Wird abgeholt', []),
        pickupTypeFriday: this.fb.control('Wird abgeholt', []),
        pickupNoteMonday: this.fb.control('', []),
        pickupNoteTuesday: this.fb.control('', []),
        pickupNoteWednesday: this.fb.control('', []),
        pickupNoteThursday: this.fb.control('', []),
        pickupNoteFriday: this.fb.control('', []),
      }),
    });
  }
}

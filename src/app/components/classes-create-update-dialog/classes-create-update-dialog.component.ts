import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Class } from 'src/app/models/class';
import { Days } from 'src/app/models/days';
import { HomeworkTimes } from 'src/app/models/homework-times';
import { LunchTimes } from 'src/app/models/lunch-times';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'ogs-classes-create-update-dialog',
  templateUrl: './classes-create-update-dialog.component.html',
  styleUrls: ['./classes-create-update-dialog.component.scss'],
})
export class ClassesCreateUpdateDialogComponent implements OnInit {
  classItem!: Class;
  classForm!: FormGroup;

  Days = Days;
  LunchTimes = LunchTimes;
  HomeworkTimes = HomeworkTimes;

  constructor(
    private dbService: DbService,
    public dialogRef: MatDialogRef<ClassesCreateUpdateDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: MatDialogConfig
  ) {
    this.classItem = data as Class;
  }

  get name() {
    return this.classForm.get('name');
  }

  get teacher() {
    return this.classForm.get('teacher');
  }

  ngOnInit() {
    this.init();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    if (this.classForm.valid) {
      const current = { ...this.classForm.getRawValue() };

      if (this.classItem) {
        current.id = this.classItem.id;
        this.updateClass(current as Class);
        return;
      }

      this.createClass(current as Class);
    }
  }

  private init() {
    this.classForm = this.fb.group({
      name: this.fb.control(this.classItem?.name ?? '', [Validators.required]),
      teacher: this.fb.control(this.classItem?.teacher ?? '', []),
      lunchMonday: this.fb.control(this.classItem?.lunchMonday ?? LunchTimes.first, []),
      lunchTuesday: this.fb.control(this.classItem?.lunchTuesday ?? LunchTimes.first, []),
      lunchWednesday: this.fb.control(this.classItem?.lunchWednesday ?? LunchTimes.first, []),
      lunchThursday: this.fb.control(this.classItem?.lunchThursday ?? LunchTimes.first, []),
      lunchFriday: this.fb.control(this.classItem?.lunchFriday ?? LunchTimes.first, []),
      homeworkMonday: this.fb.control(this.classItem?.homeworkMonday ?? HomeworkTimes.first, []),
      homeworkTuesday: this.fb.control(this.classItem?.homeworkTuesday ?? HomeworkTimes.first, []),
      homeworkWednesday: this.fb.control(this.classItem?.homeworkWednesday ?? HomeworkTimes.first, []),
      homeworkThursday: this.fb.control(this.classItem?.homeworkThursday ?? HomeworkTimes.first, []),
      homeworkFriday: this.fb.control(this.classItem?.homeworkFriday ?? HomeworkTimes.first, []),
    });
  }

  private createClass(classItem: Class) {
    this.dbService.createClass(classItem);
    this.dialogRef.close();
    this.dbService.getClasses();
  }

  private updateClass(classItem: Class) {
    this.dbService.updateClass(classItem);
    this.dialogRef.close();
    this.dbService.getClasses();
  }
}

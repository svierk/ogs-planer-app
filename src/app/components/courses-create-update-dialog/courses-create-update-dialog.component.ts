import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Course } from 'src/app/models/course';
import { Days } from 'src/app/models/days';
import { DbService } from 'src/app/services/db.service';
import { ToastService } from 'src/app/services/toast.service';
import { ChildrenCreateUpdateDialogComponent } from '../children-create-update-dialog/children-create-update-dialog.component';

@Component({
  selector: 'ogs-courses-create-update-dialog',
  templateUrl: './courses-create-update-dialog.component.html',
})
export class CoursesCreateUpdateDialogComponent implements OnInit {
  course!: Course;
  courseForm!: FormGroup;
  days = Object.values(Days);

  constructor(
    public dbService: DbService,
    public dialogRef: MatDialogRef<ChildrenCreateUpdateDialogComponent>,
    private fb: FormBuilder,
    private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) data: MatDialogConfig
  ) {
    this.course = data as Course;
  }

  get name() {
    return this.courseForm.get('name');
  }

  get teacher() {
    return this.courseForm.get('teacher');
  }

  get start() {
    return this.courseForm.get('start');
  }

  get end() {
    return this.courseForm.get('end');
  }

  ngOnInit() {
    this.init();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    if (this.courseForm.valid) {
      const current = { ...this.courseForm.getRawValue() };
      current.day = current.daySelect;

      if (this.course) {
        current.id = this.course.id;
        this.updateCourse(current as Course);
        return;
      }

      this.createCourse(current as Course);
    }
  }

  private init() {
    this.courseForm = this.fb.group({
      name: this.fb.control(this.course?.name ?? '', [Validators.required]),
      teacher: this.fb.control(this.course?.teacher ?? '', [Validators.required]),
      start: this.fb.control(this.course?.start ?? '', [Validators.required]),
      end: this.fb.control(this.course?.end ?? '', [Validators.required]),
      daySelect: this.fb.control(this.course?.day ?? Days.Monday, []),
      note: this.fb.control(this.course?.note ?? '', []),
    });
  }

  private createCourse(course: Course) {
    this.dbService.createCourse(course);
    this.toastService.showSuccessToast('Erstellen erfolgreich', 'Kurs wurde angelegt.');
    this.closeDialog();
    this.dbService.getCourses();
  }

  private updateCourse(course: Course) {
    this.dbService.updateCourse(course);
    this.toastService.showSuccessToast('Update erfolgreich', 'Kurs wurde aktualisiert.');
    this.closeDialog();
    this.dbService.getCourses();
  }
}

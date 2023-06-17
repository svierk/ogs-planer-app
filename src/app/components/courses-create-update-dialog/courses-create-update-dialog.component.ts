import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Course } from 'src/app/models/course';
import { Days } from 'src/app/models/days';
import { DbService } from 'src/app/services/db.service';
import { ChildrenCreateUpdateDialogComponent } from '../children-create-update-dialog/children-create-update-dialog.component';

@Component({
  selector: 'ogs-courses-create-update-dialog',
  templateUrl: './courses-create-update-dialog.component.html',
  styleUrls: ['./courses-create-update-dialog.component.scss'],
})
export class CoursesCreateUpdateDialogComponent implements OnInit {
  course!: Course;
  courseForm!: FormGroup;

  Days = Days;

  constructor(
    private cdr: ChangeDetectorRef,
    private dbService: DbService,
    public dialogRef: MatDialogRef<ChildrenCreateUpdateDialogComponent>,
    private fb: FormBuilder,
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
      daySelect: this.fb.control(this.course?.day ?? Days.Monday, []),
      note: this.fb.control(this.course?.note ?? '', []),
      start: this.fb.control(this.course?.start ?? '', [Validators.required]),
      end: this.fb.control(this.course?.end ?? '', [Validators.required]),
    });
  }

  private createCourse(course: Course) {
    this.dbService.createCourse(course);
    this.dialogRef.close();
    this.dbService.getCourses();
  }

  private updateCourse(course: Course) {
    this.dbService.updateCourse(course);
    this.dialogRef.close();
    this.dbService.getCourses();
  }
}

import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'ogs-courses-delete-dialog',
  templateUrl: './courses-delete-dialog.component.html',
})
export class CoursesDeleteDialogComponent {
  courseId!: number;

  constructor(
    private dbService: DbService,
    public dialogRef: MatDialogRef<CoursesDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: MatDialogConfig
  ) {
    this.courseId = +data;
  }

  @HostListener('window:keydown.Enter', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    this.deleteCourse();
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  deleteCourse() {
    this.dbService.deleteCourse(this.courseId);
    this.dbService.getCourses();
    this.closeDialog();
  }
}

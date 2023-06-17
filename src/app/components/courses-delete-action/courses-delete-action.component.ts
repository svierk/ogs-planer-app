import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Course } from 'src/app/models/course';
import { CoursesDeleteDialogComponent } from '../courses-delete-dialog/courses-delete-dialog.component';

@Component({
  selector: 'ogs-courses-delete-action',
  templateUrl: './courses-delete-action.component.html',
  styleUrls: ['./courses-delete-action.component.scss'],
})
export class CoursesDeleteActionComponent {
  @Input()
  course!: Course;

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const config = new MatDialogConfig();
    config.autoFocus = false;
    config.data = this.course.id;
    this.dialog.open(CoursesDeleteDialogComponent, config);
  }
}

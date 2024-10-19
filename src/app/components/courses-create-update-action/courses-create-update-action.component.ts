import { Component, Input, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Course } from 'src/app/models/course';
import { CoursesCreateUpdateDialogComponent } from '../courses-create-update-dialog/courses-create-update-dialog.component';

@Component({
  selector: 'ogs-courses-create-update-action',
  templateUrl: './courses-create-update-action.component.html',
  styleUrls: ['./courses-create-update-action.component.scss'],
})
export class CoursesCreateUpdateActionComponent {
  @Input()
  course!: Course;

  @Input()
  isUpdate = false;

  constructor(
    readonly dialog: MatDialog,
    readonly zone: NgZone
  ) {}

  openDialog() {
    const config = new MatDialogConfig();
    config.autoFocus = false;
    config.data = this.course;

    this.zone.run(() => {
      this.dialog.open(CoursesCreateUpdateDialogComponent, config);
    });
  }
}

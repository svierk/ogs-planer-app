import { Component, Input, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Course } from 'src/app/models/course';
import { CoursesCreateUpdateDialogComponent } from '../courses-create-update-dialog/courses-create-update-dialog.component';
import { NgIf } from '@angular/common';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'ogs-courses-create-update-action',
  templateUrl: './courses-create-update-action.component.html',
  styleUrls: ['./courses-create-update-action.component.scss'],
  standalone: true,
  imports: [NgIf, MatIconButton, MatIcon, MatButton],
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

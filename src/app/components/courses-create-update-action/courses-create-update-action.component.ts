import { Component, Input, NgZone, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Course } from 'src/app/models/course';
import { CoursesCreateUpdateDialogComponent } from '../courses-create-update-dialog/courses-create-update-dialog.component';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'ogs-courses-create-update-action',
  templateUrl: './courses-create-update-action.component.html',
  styleUrls: ['./courses-create-update-action.component.scss'],
  standalone: true,
  imports: [MatIconButton, MatIcon, MatButton],
})
export class CoursesCreateUpdateActionComponent {
  @Input()
  course!: Course;

  @Input()
  isUpdate = false;

  readonly dialog = inject(MatDialog);
  readonly zone = inject(NgZone);

  openDialog() {
    const config = new MatDialogConfig();
    config.autoFocus = false;
    config.data = this.course;

    this.zone.run(() => {
      this.dialog.open(CoursesCreateUpdateDialogComponent, config);
    });
  }
}

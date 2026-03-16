import { Component, inject, input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Course } from 'src/app/models/course';
import { CoursesDeleteDialogComponent } from '../courses-delete-dialog/courses-delete-dialog.component';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'ogs-courses-delete-action',
  templateUrl: './courses-delete-action.component.html',
  standalone: true,
  imports: [MatIconButton, MatIcon],
})
export class CoursesDeleteActionComponent {
  readonly course = input.required<Course>();

  dialog = inject(MatDialog);

  openDialog() {
    const config = new MatDialogConfig();
    config.autoFocus = false;
    config.data = this.course().id;
    this.dialog.open(CoursesDeleteDialogComponent, config);
  }
}

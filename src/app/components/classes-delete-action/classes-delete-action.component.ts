import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Class } from 'src/app/models/class';
import { ClassesDeleteDialogComponent } from '../classes-delete-dialog/classes-delete-dialog.component';

@Component({
  selector: 'ogs-classes-delete-action',
  templateUrl: './classes-delete-action.component.html',
})
export class ClassesDeleteActionComponent {
  @Input()
  classItem!: Class;

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const config = new MatDialogConfig();
    config.autoFocus = false;
    config.data = this.classItem.id;
    this.dialog.open(ClassesDeleteDialogComponent, config);
  }
}

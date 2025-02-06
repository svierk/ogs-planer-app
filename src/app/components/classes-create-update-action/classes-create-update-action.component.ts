import { Component, Input, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Class } from 'src/app/models/class';
import { ClassesCreateUpdateDialogComponent } from '../classes-create-update-dialog/classes-create-update-dialog.component';

@Component({
  selector: 'ogs-classes-create-update-action',
  templateUrl: './classes-create-update-action.component.html',
  styleUrls: ['./classes-create-update-action.component.scss'],
  standalone: false,
})
export class ClassesCreateUpdateActionComponent {
  @Input()
  classItem!: Class;

  @Input()
  isUpdate = false;

  constructor(
    readonly dialog: MatDialog,
    readonly zone: NgZone
  ) {}

  openDialog() {
    const config = new MatDialogConfig();
    config.autoFocus = false;
    config.data = this.classItem;

    this.zone.run(() => {
      this.dialog.open(ClassesCreateUpdateDialogComponent, config);
    });
  }
}

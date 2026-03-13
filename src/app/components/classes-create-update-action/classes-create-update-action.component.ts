import { Component, Input, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Class } from 'src/app/models/class';
import { ClassesCreateUpdateDialogComponent } from '../classes-create-update-dialog/classes-create-update-dialog.component';
import { NgIf } from '@angular/common';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'ogs-classes-create-update-action',
    templateUrl: './classes-create-update-action.component.html',
    styleUrls: ['./classes-create-update-action.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        MatIconButton,
        MatIcon,
        MatButton,
    ],
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

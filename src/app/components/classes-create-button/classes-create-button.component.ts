import { Component, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClassesCreateUpdateDialogComponent } from '../classes-create-update-dialog/classes-create-update-dialog.component';

@Component({
  selector: 'ogs-classes-create-button',
  templateUrl: './classes-create-button.component.html',
  styleUrls: ['./classes-create-button.component.scss'],
})
export class ClassesCreateButtonComponent {
  constructor(private dialog: MatDialog, private zone: NgZone) {}

  openDialog() {
    this.zone.run(() => {
      this.dialog.open(ClassesCreateUpdateDialogComponent, {
        autoFocus: false,
      });
    });
  }
}

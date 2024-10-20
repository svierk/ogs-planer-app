import { Component, Input, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Child } from 'src/app/models/child';
import { ChildrenCreateUpdateDialogComponent } from '../children-create-update-dialog/children-create-update-dialog.component';

@Component({
  selector: 'ogs-children-create-update-action',
  templateUrl: './children-create-update-action.component.html',
  styleUrls: ['./children-create-update-action.component.scss'],
})
export class ChildrenCreateUpdateActionComponent {
  @Input()
  child!: Child;

  @Input()
  isUpdate = false;

  constructor(
    readonly dialog: MatDialog,
    readonly zone: NgZone
  ) {}

  openDialog() {
    const config = new MatDialogConfig();
    config.autoFocus = false;
    config.data = this.child;

    this.zone.run(() => {
      this.dialog.open(ChildrenCreateUpdateDialogComponent, config);
    });
  }
}

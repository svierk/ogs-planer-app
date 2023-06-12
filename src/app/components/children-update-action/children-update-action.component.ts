import { Component, Input, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Child } from 'src/app/models/child';
import { ChildrenCreateUpdateDialogComponent } from '../children-create-update-dialog/children-create-update-dialog.component';

@Component({
  selector: 'ogs-children-update-action',
  templateUrl: './children-update-action.component.html',
  styleUrls: ['./children-update-action.component.scss'],
})
export class ChildrenUpdateActionComponent {
  @Input()
  child!: Child;

  constructor(private dialog: MatDialog, private zone: NgZone) {}

  openDialog() {
    const config = new MatDialogConfig();
    config.autoFocus = false;
    config.data = this.child;

    this.zone.run(() => {
      this.dialog.open(ChildrenCreateUpdateDialogComponent, config);
    });
  }
}

import { Component, Input, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Child } from 'src/app/models/child';
import { ChildrenActivitiesDialogComponent } from '../children-activities-dialog/children-activities-dialog.component';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'ogs-children-activities-action',
    templateUrl: './children-activities-action.component.html',
    standalone: true,
    imports: [MatIconButton, MatIcon],
})
export class ChildrenActivitiesActionComponent {
  @Input()
  child!: Child;

  constructor(
    public dialog: MatDialog,
    readonly zone: NgZone
  ) {}

  openDialog() {
    const config = new MatDialogConfig();
    config.autoFocus = false;
    config.data = this.child;

    this.zone.run(() => {
      this.dialog.open(ChildrenActivitiesDialogComponent, config);
    });
  }
}

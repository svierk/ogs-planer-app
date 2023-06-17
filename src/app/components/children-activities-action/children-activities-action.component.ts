import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Child } from 'src/app/models/child';
import { ChildrenActivitiesDialogComponent } from '../children-activities-dialog/children-activities-dialog.component';

@Component({
  selector: 'ogs-children-activities-action',
  templateUrl: './children-activities-action.component.html',
  styleUrls: ['./children-activities-action.component.scss'],
})
export class ChildrenActivitiesActionComponent {
  @Input()
  child!: Child;

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const config = new MatDialogConfig();
    config.autoFocus = false;
    config.data = this.child.id;
    this.dialog.open(ChildrenActivitiesDialogComponent, config);
  }
}
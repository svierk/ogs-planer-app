import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Child } from 'src/app/models/child';
import { ChildrenDeleteDialogComponent } from '../children-delete-dialog/children-delete-dialog.component';

@Component({
  selector: 'ogs-children-delete-action',
  templateUrl: './children-delete-action.component.html',
  styleUrls: ['./children-delete-action.component.scss'],
})
export class ChildrenDeleteActionComponent {
  @Input()
  child!: Child;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const config = new MatDialogConfig();
    config.autoFocus = false;
    config.data = {
      id: this.child.id,
    };
    this.dialog.open(ChildrenDeleteDialogComponent, config);
  }
}

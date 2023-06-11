import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChildrenCreateUpdateDialogComponent } from '../children-create-update-dialog/children-create-update-dialog.component';

@Component({
  selector: 'ogs-children-create-button',
  templateUrl: './children-create-button.component.html',
  styleUrls: ['./children-create-button.component.scss'],
})
export class ChildrenCreateButtonComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(ChildrenCreateUpdateDialogComponent, {
      autoFocus: false,
    });
  }
}

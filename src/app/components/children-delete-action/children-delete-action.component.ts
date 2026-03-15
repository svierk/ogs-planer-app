import { Component, Input, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Child } from 'src/app/models/child';
import { ChildrenDeleteDialogComponent } from '../children-delete-dialog/children-delete-dialog.component';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'ogs-children-delete-action',
  templateUrl: './children-delete-action.component.html',
  standalone: true,
  imports: [MatIconButton, MatIcon],
})
export class ChildrenDeleteActionComponent {
  @Input()
  child!: Child;

  dialog = inject(MatDialog);

  openDialog() {
    const config = new MatDialogConfig();
    config.autoFocus = false;
    config.data = this.child.id;
    this.dialog.open(ChildrenDeleteDialogComponent, config);
  }
}

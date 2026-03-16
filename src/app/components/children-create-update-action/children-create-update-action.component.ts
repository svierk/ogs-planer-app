import { Component, NgZone, inject, input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Child } from 'src/app/models/child';
import { ChildrenCreateUpdateDialogComponent } from '../children-create-update-dialog/children-create-update-dialog.component';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'ogs-children-create-update-action',
  templateUrl: './children-create-update-action.component.html',
  styleUrls: ['./children-create-update-action.component.scss'],
  standalone: true,
  imports: [MatIconButton, MatIcon, MatButton],
})
export class ChildrenCreateUpdateActionComponent {
  readonly child = input<Child | undefined>(undefined);

  readonly isUpdate = input(false);

  readonly dialog = inject(MatDialog);
  readonly zone = inject(NgZone);

  openDialog() {
    const config = new MatDialogConfig();
    config.autoFocus = false;
    config.data = this.child();

    this.zone.run(() => {
      this.dialog.open(ChildrenCreateUpdateDialogComponent, config);
    });
  }
}

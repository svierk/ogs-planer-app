import { Component, HostListener, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogConfig,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { DbService } from 'src/app/services/db.service';
import { ToastService } from 'src/app/services/toast.service';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'ogs-children-delete-dialog',
  templateUrl: './children-delete-dialog.component.html',
  standalone: true,
  imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatDialogActions, MatButton, MatDialogClose],
})
export class ChildrenDeleteDialogComponent {
  readonly dbService = inject(DbService);
  readonly toastService = inject(ToastService);
  dialogRef = inject<MatDialogRef<ChildrenDeleteDialogComponent>>(MatDialogRef);

  userId!: number;

  constructor() {
    const data = inject<MatDialogConfig>(MAT_DIALOG_DATA);

    this.userId = +data;
  }

  @HostListener('window:keydown.Enter', ['$event'])
  handleKeyDown(event: Event) {
    event.preventDefault();
    this.deleteChild();
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  deleteChild() {
    this.dbService.deleteChild(this.userId);
    this.dbService.getChildren();
    this.toastService.showSuccessToast('Löschen erfolgreich', 'Schüler wurde entfernt.');
    this.closeDialog();
  }
}

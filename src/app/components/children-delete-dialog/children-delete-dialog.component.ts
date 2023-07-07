import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DbService } from 'src/app/services/db.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'ogs-children-delete-dialog',
  templateUrl: './children-delete-dialog.component.html',
})
export class ChildrenDeleteDialogComponent {
  userId!: number;

  constructor(
    private dbService: DbService,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<ChildrenDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: MatDialogConfig
  ) {
    this.userId = +data;
  }

  @HostListener('window:keydown.Enter', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
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

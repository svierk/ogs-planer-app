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
  selector: 'ogs-classes-delete-dialog',
  templateUrl: './classes-delete-dialog.component.html',
  standalone: true,
  imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatDialogActions, MatButton, MatDialogClose],
})
export class ClassesDeleteDialogComponent {
  readonly dbService = inject(DbService);
  readonly toastService = inject(ToastService);
  dialogRef = inject<MatDialogRef<ClassesDeleteDialogComponent>>(MatDialogRef);

  classId!: number;

  constructor() {
    const data = inject<MatDialogConfig>(MAT_DIALOG_DATA);

    this.classId = +data;
  }

  @HostListener('window:keydown.Enter', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    this.deleteClass();
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  deleteClass() {
    this.dbService.deleteClass(this.classId);
    this.dbService.getClasses();
    this.toastService.showSuccessToast('Löschen erfolgreich', 'Klasse wurde entfernt.');
    this.closeDialog();
  }
}

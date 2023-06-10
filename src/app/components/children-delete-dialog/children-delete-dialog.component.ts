import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'ogs-children-delete-dialog',
  templateUrl: './children-delete-dialog.component.html',
  styleUrls: ['./children-delete-dialog.component.scss'],
})
export class ChildrenDeleteDialogComponent {
  userId!: number;

  constructor(
    public dialogRef: MatDialogRef<ChildrenDeleteDialogComponent>,
    private dbService: DbService,
    @Inject(MAT_DIALOG_DATA) data: MatDialogConfig
  ) {
    const id = data.id ?? '';
    this.userId = +id;
  }

  @HostListener('window:keydown.Enter', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    event.preventDefault();
    this.deleteChild();
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteChild() {
    this.dbService.deleteChild(this.userId);
    this.dbService.getChildren();
    this.closeDialog();
  }
}

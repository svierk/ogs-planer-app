import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Class } from 'src/app/models/class';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'ogs-classes-create-update-dialog',
  templateUrl: './classes-create-update-dialog.component.html',
  styleUrls: ['./classes-create-update-dialog.component.scss'],
})
export class ClassesCreateUpdateDialogComponent implements OnInit {
  classItem!: Class;
  classForm!: FormGroup;

  constructor(
    private dbService: DbService,
    public dialogRef: MatDialogRef<ClassesCreateUpdateDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: MatDialogConfig
  ) {
    this.classItem = data as Class;
  }

  get name() {
    return this.classForm.get('name');
  }

  ngOnInit() {
    this.init();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    if (this.classForm.valid) {
      const current = { ...this.classForm.getRawValue() };

      if (this.classItem) {
        current.id = this.classItem.id;
        this.updateClass(current as Class);
        return;
      }

      this.createClass(current as Class);
    }
  }

  private init() {
    this.classForm = this.fb.group({
      name: this.fb.control(this.classItem?.name ?? '', [Validators.required]),
    });
  }

  private createClass(classItem: Class) {
    this.dbService.createClass(classItem);
    this.dialogRef.close();
    this.dbService.getClasses();
  }

  private updateClass(classItem: Class) {
    this.dbService.updateClass(classItem);
    this.dialogRef.close();
    this.dbService.getClasses();
  }
}

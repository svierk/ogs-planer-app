import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Child } from 'src/app/models/child';
import { Class } from 'src/app/models/class';
import { DbService } from 'src/app/services/db.service';

const phoneRegex = /^[+]\d{1,15}$/;

@Component({
  selector: 'ogs-children-create-update-dialog',
  templateUrl: './children-create-update-dialog.component.html',
  providers: [FormBuilder],
})
export class ChildrenCreateUpdateDialogComponent implements OnInit {
  child!: Child;
  classes!: Class[];
  childForm!: FormGroup;

  constructor(
    private cdr: ChangeDetectorRef,
    private dbService: DbService,
    public dialogRef: MatDialogRef<ChildrenCreateUpdateDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: MatDialogConfig
  ) {
    this.child = data as Child;
    this.dbService.classes.subscribe((value) => {
      this.classes = value;
      this.classes.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  get firstName() {
    return this.childForm.get('firstName');
  }

  get lastName() {
    return this.childForm.get('lastName');
  }

  get phone() {
    return this.childForm.get('phone');
  }

  ngOnInit() {
    this.init();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    if (this.childForm.valid) {
      const current = { ...this.childForm.getRawValue() };
      current.classId = current.classSelect;

      if (this.child) {
        current.id = this.child.id;
        this.updateChild(current as Child);
        return;
      }

      this.createChild(current as Child);
    }
  }

  private init() {
    this.childForm = this.fb.group({
      firstName: this.fb.control(this.child?.firstName ?? '', [Validators.required]),
      lastName: this.fb.control(this.child?.lastName ?? '', [Validators.required]),
      phone: this.fb.control(this.child?.phone ?? '', [
        Validators.minLength(7),
        Validators.maxLength(15),
        Validators.pattern(phoneRegex),
      ]),
      classSelect: this.fb.control(this.child?.classId ?? '', []),
    });
  }

  private createChild(child: Child) {
    this.dbService.createChild(child);
    this.dialogRef.close();
    this.dbService.getChildren();
  }

  private updateChild(child: Child) {
    this.dbService.updateChild(child);
    this.dialogRef.close();
    this.dbService.getChildren();
  }
}

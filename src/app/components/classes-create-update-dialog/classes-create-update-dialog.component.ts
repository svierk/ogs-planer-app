import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Class } from 'src/app/models/class';
import { ClassSchedule } from 'src/app/models/class-schedule';
import { Days } from 'src/app/models/days';
import { HomeworkTimes } from 'src/app/models/homework-times';
import { LunchTimes } from 'src/app/models/lunch-times';
import { DbService } from 'src/app/services/db.service';
import { ToastService } from 'src/app/services/toast.service';

const DAYS_MAP = [
  { key: 'Monday', label: 'Montag' },
  { key: 'Tuesday', label: 'Dienstag' },
  { key: 'Wednesday', label: 'Mittwoch' },
  { key: 'Thursday', label: 'Donnerstag' },
  { key: 'Friday', label: 'Freitag' },
];

@Component({
  selector: 'ogs-classes-create-update-dialog',
  templateUrl: './classes-create-update-dialog.component.html',
  styleUrls: ['./classes-create-update-dialog.component.scss'],
})
export class ClassesCreateUpdateDialogComponent implements OnInit {
  classItem!: Class;
  classSchedules: ClassSchedule[] = [];
  classForm!: FormGroup;
  days = Object.keys(Days);
  LunchTimes = LunchTimes;
  HomeworkTimes = HomeworkTimes;

  constructor(
    public dbService: DbService,
    public dialogRef: MatDialogRef<ClassesCreateUpdateDialogComponent>,
    readonly fb: FormBuilder,
    readonly toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) data: MatDialogConfig
  ) {
    this.classItem = data as Class;
    this.dbService.classSchedules.subscribe((value) => {
      this.classSchedules = value;
    });
  }

  get name() {
    return this.classForm.get('name');
  }

  get teacher() {
    return this.classForm.get('teacher');
  }

  ngOnInit() {
    this.init();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onChange(evt: MatSelectChange) {
    const controlName = evt.source.ngControl.name as string;
    const time = evt.value;
    let day;

    if (controlName.startsWith('lunch')) {
      day = controlName.split('lunch').pop() as string;
      const key = Object.keys(LunchTimes)[Object.values(LunchTimes).indexOf(time as LunchTimes)];
      this.classForm.get(`homework${day}`)?.setValue(this.getValueByKeyForHomeworkTimes(key));
    } else {
      day = controlName.split('homework').pop() as string;
      const key = Object.keys(HomeworkTimes)[Object.values(HomeworkTimes).indexOf(time as HomeworkTimes)];
      this.classForm.get(`lunch${day}`)?.setValue(this.getValueByKeyForLunchTimes(key));
    }
  }

  submit() {
    if (this.classForm.valid) {
      const current = { ...this.classForm.getRawValue() };
      const schedule = this.buildSchedule(this.classItem?.id);

      if (this.classItem) {
        current.id = this.classItem.id;
        this.updateClass({ ...current, schedule } as Class);
        return;
      }

      this.createClass({ ...current, schedule } as Class);
    }
  }

  private init() {
    const schedule = (day: string) =>
      this.classSchedules.find((s) => s.classId === this.classItem?.id && s.day === day);

    this.classForm = this.fb.group({
      name: this.fb.control(this.classItem?.name ?? '', [Validators.required]),
      teacher: this.fb.control(this.classItem?.teacher ?? '', []),
      lunchMonday: this.fb.control(schedule('Montag')?.lunchTime ?? LunchTimes.first, []),
      lunchTuesday: this.fb.control(schedule('Dienstag')?.lunchTime ?? LunchTimes.first, []),
      lunchWednesday: this.fb.control(schedule('Mittwoch')?.lunchTime ?? LunchTimes.first, []),
      lunchThursday: this.fb.control(schedule('Donnerstag')?.lunchTime ?? LunchTimes.first, []),
      lunchFriday: this.fb.control(schedule('Freitag')?.lunchTime ?? LunchTimes.first, []),
      homeworkMonday: this.fb.control(schedule('Montag')?.homeworkTime ?? HomeworkTimes.first, []),
      homeworkTuesday: this.fb.control(schedule('Dienstag')?.homeworkTime ?? HomeworkTimes.first, []),
      homeworkWednesday: this.fb.control(schedule('Mittwoch')?.homeworkTime ?? HomeworkTimes.first, []),
      homeworkThursday: this.fb.control(schedule('Donnerstag')?.homeworkTime ?? HomeworkTimes.first, []),
      homeworkFriday: this.fb.control(schedule('Freitag')?.homeworkTime ?? HomeworkTimes.first, []),
    });
  }

  private buildSchedule(classId?: number): ClassSchedule[] {
    return DAYS_MAP.map((d) => ({
      classId: classId ?? 0,
      day: d.label,
      lunchTime: this.classForm.get(`lunch${d.key}`)?.value,
      homeworkTime: this.classForm.get(`homework${d.key}`)?.value,
    }));
  }

  private getValueByKeyForLunchTimes(value: string) {
    return Object.entries(LunchTimes).find(([key]) => key === value)?.[1];
  }

  private getValueByKeyForHomeworkTimes(value: string) {
    return Object.entries(HomeworkTimes).find(([key]) => key === value)?.[1];
  }

  private createClass(classItem: Class) {
    this.dbService.createClass(classItem);
    this.toastService.showSuccessToast('Erstellen erfolgreich', 'Klasse wurde angelegt.');
    this.closeDialog();
    this.dbService.getClasses();
    this.dbService.getClassSchedules();
  }

  private updateClass(classItem: Class) {
    this.dbService.updateClass(classItem);
    this.toastService.showSuccessToast('Update erfolgreich', 'Klasse wurde aktualisiert.');
    this.closeDialog();
    this.dbService.getClasses();
    this.dbService.getClassSchedules();
  }
}

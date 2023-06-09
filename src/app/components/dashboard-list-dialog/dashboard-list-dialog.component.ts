import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivityTypes } from 'src/app/models/activity-types';
import { Child } from 'src/app/models/child';
import { ChildCourse } from 'src/app/models/child-course';
import { Class } from 'src/app/models/class';
import { Course } from 'src/app/models/course';
import { EarlyCare } from 'src/app/models/early-care';
import { Homework } from 'src/app/models/homework';
import { Lunch } from 'src/app/models/lunch';
import { Pickup } from 'src/app/models/pickup';
import { DbService } from 'src/app/services/db.service';
import { ExcelService } from 'src/app/services/excel.service';
import { ChildrenCreateUpdateDialogComponent } from '../children-create-update-dialog/children-create-update-dialog.component';

const MONTHS = [
  { label: 'Januar', value: 0 },
  { label: 'Februar', value: 1 },
  { label: 'März', value: 2 },
  { label: 'April', value: 3 },
  { label: 'Mai', value: 4 },
  { label: 'Juni', value: 5 },
  { label: 'Juli', value: 6 },
  { label: 'August', value: 7 },
  { label: 'September', value: 8 },
  { label: 'Oktober', value: 9 },
  { label: 'November', value: 10 },
  { label: 'Dezember', value: 11 },
];

const DAYS = [
  { label: 'Montag', value: 1, translation: 'Monday' },
  { label: 'Dienstag', value: 2, translation: 'Tuesday' },
  { label: 'Mittwoch', value: 3, translation: 'Wednesday' },
  { label: 'Donnerstag', value: 4, translation: 'Thursday' },
  { label: 'Freitag', value: 5, translation: 'Friday' },
];

@Component({
  selector: 'ogs-dashboard-list-dialog',
  templateUrl: './dashboard-list-dialog.component.html',
})
export class DashboardListDialogComponent implements OnInit {
  children: Child[] = [];
  classes: Class[] = [];
  courses: Course[] = [];
  earlyCare: EarlyCare[] = [];
  lunch: Lunch[] = [];
  homework: Homework[] = [];
  childCourses: ChildCourse[] = [];
  pickup: Pickup[] = [];
  type: ActivityTypes;
  listForm!: FormGroup;
  months = MONTHS;
  days = DAYS;
  ActivityTypes = ActivityTypes;

  constructor(
    public dbService: DbService,
    private excelService: ExcelService,
    public dialogRef: MatDialogRef<ChildrenCreateUpdateDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: MatDialogConfig
  ) {
    this.type = data as unknown as ActivityTypes;
    this.dbService.children.subscribe((value) => {
      this.children = value;
    });
    this.dbService.classes.subscribe((value) => {
      this.classes = value;
      this.classes.sort((a, b) => a.name.localeCompare(b.name));
    });
    this.dbService.courses.subscribe((value) => {
      this.courses = value;
    });
    this.dbService.earlyCare.subscribe((value) => {
      this.earlyCare = value;
    });
    this.dbService.lunch.subscribe((value) => {
      this.lunch = value;
    });
    this.dbService.homework.subscribe((value) => {
      this.homework = value;
    });
    this.dbService.childCourses.subscribe((value) => {
      this.childCourses = value;
    });
    this.dbService.pickup.subscribe((value) => {
      this.pickup = value;
    });
  }

  ngOnInit() {
    this.init();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    if (this.listForm.valid) {
      const current = { ...this.listForm.getRawValue() };

      switch (this.type) {
        case ActivityTypes.EarlyCare:
          this.exportEarlyCareList(current.monthSelect as number, current.daySelect as number);
          break;
        case ActivityTypes.Lunch:
          this.exportLunchList(
            current.monthSelect as number,
            current.daySelect as number,
            current.classSelect as number
          );
          break;
        case ActivityTypes.Homework:
          this.exportHomeworkList(
            current.monthSelect as number,
            current.daySelect as number,
            current.classSelect as number
          );
          break;
        case ActivityTypes.Courses:
          this.exportCoursesList(current.monthSelect as number, current.courseSelect as number);
          break;
        case ActivityTypes.Pickup:
          this.exportPickupList(current.monthSelect as number, current.daySelect as number);
          break;
      }
    }
  }

  private init() {
    this.listForm = this.fb.group({
      monthSelect: this.fb.control(0, []),
      daySelect: this.fb.control(1, []),
      classSelect: this.fb.control(this.classes[0]?.id ?? '', []),
      courseSelect: this.fb.control(this.courses[0]?.id ?? '', []),
    });
  }

  private exportEarlyCareList(month: number, day: number) {
    const list: any[] = [];
    const selectedMonth = MONTHS.find((m) => m.value === month);
    const selectedDay = DAYS.find((d) => d.value === day);

    this.children.forEach((child) => {
      const classId = child.classId;
      const className = classId ? this.classes.find((item) => item.id === +classId)?.name : '';
      const earlyCare: any = this.earlyCare.find((item) => item.childId === child.id);

      if (earlyCare[`earlyCareParticipation${selectedDay?.translation as string}`] === 1) {
        const keys = ['Klasse', 'Name', 'Vorname', 'Beginn', ...this.getSpecificDaysOfMonth(month, day)];
        const item: any = keys.reduce((accumulator, value) => {
          return { ...accumulator, [value]: '' };
        }, {});
        item.Klasse = className;
        item.Name = child.lastName;
        item.Vorname = child.firstName;
        item.Beginn = earlyCare[`earlyCareStart${selectedDay?.translation as string}`];
        list.push(item);
      }
    });

    this.excelService.exportToExcel(
      list,
      `Frühbetreuung_${new Date().getFullYear()}_${selectedMonth?.label as string}_${selectedDay?.label as string}`,
      `Frühbetreuung ${selectedDay?.label as string}`
    );
    this.closeDialog();
  }

  private exportLunchList(month: number, day: number, classId: number) {
    const list: any[] = [];
    const selectedMonth = MONTHS.find((m) => m.value === month);
    const selectedDay = DAYS.find((d) => d.value === day);
    const selectedClass: any = this.classes.find((c) => c.id === classId);

    this.children = this.children.filter((child) => child.classId == classId.toString());
    this.children.forEach((child) => {
      const classId = child.classId;
      const className = classId ? this.classes.find((item) => item.id === +classId)?.name : '';
      const lunch: any = this.lunch.find((item) => item.childId === child.id);

      if (lunch[`lunchParticipation${selectedDay?.translation as string}`] === 1) {
        const keys = ['Klasse', 'Name', 'Vorname', 'Hinweis', ...this.getSpecificDaysOfMonth(month, day)];
        const item: any = keys.reduce((accumulator, value) => {
          return { ...accumulator, [value]: '' };
        }, {});
        item.Klasse = className;
        item.Name = child.lastName;
        item.Vorname = child.firstName;
        item.Hinweis = lunch[`lunchNote${selectedDay?.translation as string}`];
        list.push(item);
      }
    });

    const time = `lunch${selectedDay?.translation as string}`;
    this.excelService.exportToExcel(
      list,
      `Mittagessen_${new Date().getFullYear()}_${selectedMonth?.label as string}_${selectedDay?.label as string}_${
        selectedClass?.name as string
      }`,
      `Mittagessen ${selectedDay?.label as string} ${selectedClass?.name as string} ${selectedClass[time] as string}`
    );
    this.closeDialog();
  }

  private exportHomeworkList(month: number, day: number, classId: number) {
    const list: any[] = [];
    const selectedMonth = MONTHS.find((m) => m.value === month);
    const selectedDay = DAYS.find((d) => d.value === day);
    const selectedClass: any = this.classes.find((c) => c.id === classId);

    this.children = this.children.filter((child) => child.classId == classId.toString());
    this.children.forEach((child) => {
      const classId = child.classId;
      const className = classId ? this.classes.find((item) => item.id === +classId)?.name : '';
      const homework: any = this.homework.find((item) => item.childId === child.id);

      if (homework[`homeworkParticipation${selectedDay?.translation as string}`] === 1) {
        const keys = ['Klasse', 'Name', 'Vorname', 'Bemerkung', ...this.getSpecificDaysOfMonth(month, day)];
        const item: any = keys.reduce((accumulator, value) => {
          return { ...accumulator, [value]: '' };
        }, {});
        item.Klasse = className;
        item.Name = child.lastName;
        item.Vorname = child.firstName;
        item.Bemerkung = homework[`homeworkNote${selectedDay?.translation as string}`];
        list.push(item);
      }
    });

    const time = `homework${selectedDay?.translation as string}`;
    this.excelService.exportToExcel(
      list,
      `Hausaufgaben_${new Date().getFullYear()}_${selectedMonth?.label as string}_${selectedDay?.label as string}_${
        selectedClass?.name as string
      }`,
      `Hausaufgaben ${selectedDay?.label as string} ${selectedClass?.name as string} ${selectedClass[time] as string}`
    );
    this.closeDialog();
  }

  private exportCoursesList(month: number, courseId: number) {
    const list: any[] = [];
    const selectedMonth = MONTHS.find((m) => m.value === month);
    const selectedCourse = this.courses.find((c) => c.id === courseId);
    const selectedDay = DAYS.find((d) => d.label === selectedCourse?.day);
    const courseChoices = this.childCourses.filter((course) => course.courseId === courseId);
    const childIds = courseChoices.map(({ childId }) => childId);

    this.children = this.children.filter((child) => childIds.includes(child.id as number));
    this.children.forEach((child) => {
      const classId = child.classId;
      const className = classId ? this.classes.find((item) => item.id === +classId)?.name : '';
      const keys = ['Klasse', 'Name', 'Vorname', ...this.getSpecificDaysOfMonth(month, selectedDay?.value as number)];
      const item: any = keys.reduce((accumulator, value) => {
        return { ...accumulator, [value]: '' };
      }, {});
      item.Klasse = className;
      item.Name = child.lastName;
      item.Vorname = child.firstName;
      list.push(item);
    });

    this.excelService.exportToExcel(
      list,
      `Kursliste_${new Date().getFullYear()}_${selectedMonth?.label as string}_${selectedDay?.label as string}_${
        selectedCourse?.name as string
      }`,
      `Kursliste ${selectedCourse?.name as string} | ${selectedDay?.label as string} ${
        selectedCourse?.start as string
      } - ${selectedCourse?.end as string} | ${selectedCourse?.teacher as string}`
    );
    this.closeDialog();
  }

  private exportPickupList(month: number, day: number) {
    const list: any[] = [];
    const selectedMonth = MONTHS.find((m) => m.value === month);
    const selectedDay = DAYS.find((d) => d.value === day);

    this.children.forEach((child) => {
      const classId = child.classId;
      const className = classId ? this.classes.find((item) => item.id === +classId)?.name : '';
      const pickup: any = this.pickup.find((item) => item.childId === child.id);

      if (pickup[`pickupTime${selectedDay?.translation as string}`] !== '') {
        const keys = [
          'Klasse',
          'Name',
          'Vorname',
          'Uhrzeit',
          'Abholung',
          'Hinweis',
          ...this.getSpecificDaysOfMonth(month, day),
        ];
        const item: any = keys.reduce((accumulator, value) => {
          return { ...accumulator, [value]: '' };
        }, {});
        item.Klasse = className;
        item.Name = child.lastName;
        item.Vorname = child.firstName;
        item.Uhrzeit = pickup[`pickupTime${selectedDay?.translation as string}`];
        item.Abholung = pickup[`pickupType${selectedDay?.translation as string}`];
        item.Hinweis = pickup[`pickupNote${selectedDay?.translation as string}`];
        list.push(item);
      }
    });

    this.excelService.exportToExcel(
      list,
      `Abholung_${new Date().getFullYear()}_${selectedMonth?.label as string}_${selectedDay?.label as string}`,
      `Abholung ${selectedDay?.label as string}`
    );
    this.closeDialog();
  }

  private getSpecificDaysOfMonth(month: number, day: number) {
    const date = new Date(new Date().getFullYear(), month, 1);
    const days = [];
    while (date.getMonth() === month) {
      if (date.getDay() === day) days.push(this.formatDate(new Date(date)));
      date.setDate(date.getDate() + 1);
    }

    return days;
  }

  private formatDate(input: Date) {
    const year = input.getFullYear();
    let date, month;
    date = input.getDate();
    month = input.getMonth() + 1;

    date = date.toString().padStart(2, '0');
    month = month.toString().padStart(2, '0');

    return `${date}.${month}.${year}`;
  }
}

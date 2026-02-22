/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx-js-style';
import { ActivityTypes } from '../models/activity-types';
import { Child } from '../models/child';
import { ChildCourse } from '../models/child-course';
import { ClassSchedule } from '../models/class-schedule';
import { Course } from '../models/course';
import { Days } from '../models/days';
import { EarlyCare } from '../models/early-care';
import { Homework } from '../models/homework';
import { Lunch } from '../models/lunch';
import { Pickup } from '../models/pickup';
import { ToastService } from './toast.service';

const EXCEL_EXTENSION = '.xlsx'; // excel file extension

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor(readonly toastService: ToastService) {}

  export(element: any[], fileName: string, heading: string) {
    if (!element || element.length === 0) {
      this.toastService.showErrorToast('Erstellen fehlgeschlagen', 'Liste würde keine Einträge enthalten.');
      return;
    }

    // generate workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    // generate worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element, { origin: 1 } as XLSX.JSON2SheetOpts);

    // count available columns
    const colCount = Object.keys(element[0] as object).length;

    // create array of column names, e.g. ['A1','B1'], and default column widths
    const colNames = [];
    const colWidths = [];
    for (let i = 0; i < colCount; i++) {
      colNames.push(`${String.fromCharCode(i + 65)}2`);
      colWidths.push({ wch: 15 });
    }

    // colorize header column
    for (const itm of colNames) {
      ws[itm].s = { fill: { fgColor: { rgb: '7ac9ff' } }, font: { bold: true } };
    }

    // calculate max column widths based on content
    const maxWidths = [];
    for (let i = 0; i < colCount; i++) {
      const maxWidth = element.reduce((w, r) => Math.max(w, r[Object.keys(r)[i]].length), 10);
      maxWidths.push({ wch: colWidths[i].wch <= maxWidth ? maxWidth : colWidths[i].wch });
    }

    // set final column widths
    ws['!cols'] = maxWidths;

    // merge cells in first row based on overall column count
    const merge = { s: { r: 0, c: 0 }, e: { r: 0, c: colCount - 1 } };
    if (!ws['!merges']) ws['!merges'] = [];
    ws['!merges'].push(merge);

    // add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Liste');

    // add heading row
    XLSX.utils.sheet_add_json(wb.Sheets['Liste'], [{ note: heading }], {
      header: ['note'],
      skipHeader: true,
      origin: 0,
    });
    ws['A1'].s = { alignment: { horizontal: 'center', vertical: 'center' }, font: { sz: 20 } };
    ws['!rows'] = [{ hpt: 50 }];

    this.download(wb, fileName);
  }

  exportActivities(data: any) {
    if (!data?.earlyCare?.length) {
      this.toastService.showErrorToast('Download fehlgeschlagen', 'Es wurden noch keine Aktivitäten gespeichert.');
      return;
    }

    if (!data?.childClass) {
      this.toastService.showErrorToast('Download fehlgeschlagen', 'Es wurde noch keine Klasse zugewiesen.');
      return;
    }

    // prepare data
    const child: Child = data.child;
    const classSchedules: ClassSchedule[] = data.classSchedules ?? [];
    const courses: Course[] = data.courses;
    const earlyCare: EarlyCare[] = data.earlyCare;
    const lunch: Lunch[] = data.lunch;
    const homework: Homework[] = data.homework;
    const childCourses: ChildCourse[] = data.childCourses;
    const pickup: Pickup[] = data.pickup;
    const selectedCourseIds: number[] = childCourses.map((c) => c.courseId);
    const selectedCourses = courses.filter((course) => {
      return selectedCourseIds.includes(course.id as number);
    });

    // Helpers to look up data by German day name
    const ec = (day: string) => earlyCare.find((i) => i.day === day);
    const lu = (day: string) => lunch.find((i) => i.day === day);
    const hw = (day: string) => homework.find((i) => i.day === day);
    const pu = (day: string) => pickup.find((i) => i.day === day);
    const cs = (day: string) => classSchedules.find((i) => i.day === day);

    // generate workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    // generate worksheet
    wb.SheetNames.push('Liste');

    // define worksheet data
    const ws_data = [
      ['', Days.Monday, Days.Tuesday, Days.Wednesday, Days.Thursday, Days.Friday],
      [
        ActivityTypes.EarlyCare,
        ec('Montag')?.participation ? `Ja (${ec('Montag')?.start})` : 'Nein',
        ec('Dienstag')?.participation ? `Ja (${ec('Dienstag')?.start})` : 'Nein',
        ec('Mittwoch')?.participation ? `Ja (${ec('Mittwoch')?.start})` : 'Nein',
        ec('Donnerstag')?.participation ? `Ja (${ec('Donnerstag')?.start})` : 'Nein',
        ec('Freitag')?.participation ? `Ja (${ec('Freitag')?.start})` : 'Nein',
      ],
      [
        '- Notiz',
        ec('Montag')?.note ?? ' ',
        ec('Dienstag')?.note ?? ' ',
        ec('Mittwoch')?.note ?? ' ',
        ec('Donnerstag')?.note ?? ' ',
        ec('Freitag')?.note ?? ' ',
      ],
      [
        ActivityTypes.Lunch,
        lu('Montag')?.participation ? `Ja (${cs('Montag')?.lunchTime} Uhr)` : 'Nein',
        lu('Dienstag')?.participation ? `Ja (${cs('Dienstag')?.lunchTime} Uhr)` : 'Nein',
        lu('Mittwoch')?.participation ? `Ja (${cs('Mittwoch')?.lunchTime} Uhr)` : 'Nein',
        lu('Donnerstag')?.participation ? `Ja (${cs('Donnerstag')?.lunchTime} Uhr)` : 'Nein',
        lu('Freitag')?.participation ? `Ja (${cs('Freitag')?.lunchTime} Uhr)` : 'Nein',
      ],
      [
        '- Notiz',
        lu('Montag')?.note ?? ' ',
        lu('Dienstag')?.note ?? ' ',
        lu('Mittwoch')?.note ?? ' ',
        lu('Donnerstag')?.note ?? ' ',
        lu('Freitag')?.note ?? ' ',
      ],
      [
        ActivityTypes.Homework,
        hw('Montag')?.participation ? `Ja (${cs('Montag')?.homeworkTime} Uhr)` : 'Nein',
        hw('Dienstag')?.participation ? `Ja (${cs('Dienstag')?.homeworkTime} Uhr)` : 'Nein',
        hw('Mittwoch')?.participation ? `Ja (${cs('Mittwoch')?.homeworkTime} Uhr)` : 'Nein',
        hw('Donnerstag')?.participation ? `Ja (${cs('Donnerstag')?.homeworkTime} Uhr)` : 'Nein',
        hw('Freitag')?.participation ? `Ja (${cs('Freitag')?.homeworkTime} Uhr)` : 'Nein',
      ],
      [
        '- Notiz',
        hw('Montag')?.note ?? ' ',
        hw('Dienstag')?.note ?? ' ',
        hw('Mittwoch')?.note ?? ' ',
        hw('Donnerstag')?.note ?? ' ',
        hw('Freitag')?.note ?? ' ',
      ],
      [
        ActivityTypes.Courses,
        this.getCoursesByDay(selectedCourses, Days.Monday),
        this.getCoursesByDay(selectedCourses, Days.Tuesday),
        this.getCoursesByDay(selectedCourses, Days.Wednesday),
        this.getCoursesByDay(selectedCourses, Days.Thursday),
        this.getCoursesByDay(selectedCourses, Days.Friday),
      ],
      [
        ActivityTypes.Pickup,
        pu('Montag')?.pickupTime ? `${pu('Montag')?.pickupType} (${pu('Montag')?.pickupTime} Uhr)` : '-',
        pu('Dienstag')?.pickupTime ? `${pu('Dienstag')?.pickupType} (${pu('Dienstag')?.pickupTime} Uhr)` : '-',
        pu('Mittwoch')?.pickupTime ? `${pu('Mittwoch')?.pickupType} (${pu('Mittwoch')?.pickupTime} Uhr)` : '-',
        pu('Donnerstag')?.pickupTime ? `${pu('Donnerstag')?.pickupType} (${pu('Donnerstag')?.pickupTime} Uhr)` : '-',
        pu('Freitag')?.pickupTime ? `${pu('Freitag')?.pickupType} (${pu('Freitag')?.pickupTime} Uhr)` : '-',
      ],
      [
        '- Notiz',
        pu('Montag')?.note ?? ' ',
        pu('Dienstag')?.note ?? ' ',
        pu('Mittwoch')?.note ?? ' ',
        pu('Donnerstag')?.note ?? ' ',
        pu('Freitag')?.note ?? ' ',
      ],
    ];

    // create worksheet from array
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(ws_data, { origin: 1 } as XLSX.JSON2SheetOpts);

    // create array of column names, e.g. ['A1','B1'], and default column widths
    const colCount = 6;
    const colNames = [];
    const colWidths = [];
    for (let i = 0; i < colCount; i++) {
      colNames.push(`${String.fromCharCode(i + 65)}2`);
      colWidths.push({ wch: 15 });
    }

    // colorize header column
    for (const itm of colNames) {
      ws[itm].s = { fill: { fgColor: { rgb: '7ac9ff' } }, font: { bold: true } };
    }

    // calculate max column widths based on content
    const maxWidths = [];
    for (let i = 0; i < colCount; i++) {
      const maxWidth = ws_data.reduce((w: any, r: any) => Math.max(w, r[Object.keys(r)[i]].length), 10);
      maxWidths.push({ wch: colWidths[i].wch <= maxWidth ? maxWidth : colWidths[i].wch });
    }

    // set final column widths
    ws['!cols'] = maxWidths;

    // merge cells in first row based on overall column count
    const merge = { s: { r: 0, c: 0 }, e: { r: 0, c: colCount - 1 } };
    if (!ws['!merges']) ws['!merges'] = [];
    ws['!merges'].push(merge);

    // assign the sheet object to the workbook
    wb.Sheets['Liste'] = ws;

    // add heading row
    XLSX.utils.sheet_add_json(wb.Sheets['Liste'], [{ note: `${child.firstName} ${child.lastName}` }], {
      header: ['note'],
      skipHeader: true,
      origin: 0,
    });
    ws['A1'].s = { alignment: { horizontal: 'center', vertical: 'center' }, font: { sz: 20 } };
    ws['!rows'] = [{ hpt: 50 }];

    this.download(wb, `Aktivitäten_${child.firstName}_${child.lastName}`);
  }

  download(workbook: XLSX.WorkBook, fileName: string) {
    XLSX.writeFile(workbook, `${fileName}${EXCEL_EXTENSION}`);
  }

  private getCoursesByDay(courses: Course[], day: Days) {
    const coursesForDay = courses.filter((course) => {
      return course.day === day;
    });
    const result = coursesForDay.map((course) => `${course.name} (${course.start} Uhr)`).join(', ');
    if (coursesForDay.length === 0) return '-';
    return result;
  }
}

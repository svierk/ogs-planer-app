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
      colNames.push(`${String.fromCodePoint(i + 65)}2`);
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
      maxWidths.push({ wch: Math.max(colWidths[i].wch, maxWidth) });
    }

    // set final column widths
    ws['!cols'] = maxWidths;

    // merge cells in first row based on overall column count
    const merge = { s: { r: 0, c: 0 }, e: { r: 0, c: colCount - 1 } };
    ws['!merges'] ??= [];
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
    const selectedCourseIds = new Set<number>(childCourses.map((c) => c.courseId));
    const selectedCourses = courses.filter((course) => selectedCourseIds.has(course.id as number));

    // Helpers to look up data by German day name
    const ec = (day: string) => earlyCare.find((i) => i.day === day);
    const lu = (day: string) => lunch.find((i) => i.day === day);
    const hw = (day: string) => homework.find((i) => i.day === day);
    const pu = (day: string) => pickup.find((i) => i.day === day);
    const cs = (day: string) => classSchedules.find((i) => i.day === day);

    // generate workbook and worksheet data
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    wb.SheetNames.push('Liste');

    const ws_data = [
      ['', ...Object.values(Days)],
      this.buildParticipationRow(ActivityTypes.EarlyCare, ec, (day) => `Ja (${ec(day)?.start})`),
      this.buildNoteRow(ec),
      this.buildParticipationRow(ActivityTypes.Lunch, lu, (day) => `Ja (${cs(day)?.lunchTime} Uhr)`),
      this.buildNoteRow(lu),
      this.buildParticipationRow(ActivityTypes.Homework, hw, (day) => `Ja (${cs(day)?.homeworkTime} Uhr)`),
      this.buildNoteRow(hw),
      [ActivityTypes.Courses, ...Object.values(Days).map((day) => this.getCoursesByDay(selectedCourses, day))],
      this.buildPickupRow(pu),
      this.buildNoteRow(pu),
    ];

    // create worksheet from array
    const colCount = 6;
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(ws_data, { origin: 1 } as XLSX.JSON2SheetOpts);

    // create array of column names, e.g. ['A2','B2'], and default column widths
    const colNames = [];
    const colWidths = [];
    for (let i = 0; i < colCount; i++) {
      colNames.push(`${String.fromCodePoint(i + 65)}2`);
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
      maxWidths.push({ wch: Math.max(colWidths[i].wch, maxWidth) });
    }

    // set final column widths and merge heading row
    ws['!cols'] = maxWidths;
    ws['!merges'] ??= [];
    ws['!merges'].push({ s: { r: 0, c: 0 }, e: { r: 0, c: colCount - 1 } });

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

  private buildParticipationRow(
    label: string,
    lookup: (day: string) => { participation?: number } | undefined,
    getInfo: (day: string) => string
  ): any[] {
    return [label, ...Object.values(Days).map((day) => (lookup(day)?.participation ? getInfo(day) : 'Nein'))];
  }

  private buildNoteRow(lookup: (day: string) => { note?: string } | undefined): any[] {
    return ['- Notiz', ...Object.values(Days).map((day) => lookup(day)?.note ?? ' ')];
  }

  private buildPickupRow(pu: (day: string) => { pickupTime?: string; pickupType?: string } | undefined): any[] {
    return [
      ActivityTypes.Pickup,
      ...Object.values(Days).map((day) => {
        const entry = pu(day);
        return entry?.pickupTime ? `${entry.pickupType} (${entry.pickupTime} Uhr)` : '-';
      }),
    ];
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

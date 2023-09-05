/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx-js-style';
import { ActivityTypes } from '../models/activity-types';
import { Child } from '../models/child';
import { ChildCourse } from '../models/child-course';
import { Class } from '../models/class';
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
  constructor(private toastService: ToastService) {}

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
    if (!data || !data.earlyCare) {
      this.toastService.showErrorToast('Download fehlgeschlagen', 'Es wurden noch keine Aktivitäten gespeichert.');
      return;
    }

    // prepare data
    const child: Child = data.child;
    const childClass: Class = data.childClass;
    const courses: Course[] = data.courses;
    const earlyCare: EarlyCare = data.earlyCare;
    const lunch: Lunch = data.lunch;
    const homework: Homework = data.homework;
    const childCourses: ChildCourse[] = data.childCourses;
    const pickup: Pickup = data.pickup;
    const selectedCourseIds: number[] = childCourses.map((c) => c.courseId);
    const selectedCourses = courses.filter((course) => {
      return selectedCourseIds.includes(course.id as number);
    });

    // generate workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    // generate worksheet
    wb.SheetNames.push('Liste');

    // define worksheet data
    const ws_data = [
      ['', Days.Monday, Days.Tuesday, Days.Wednesday, Days.Thursday, Days.Friday],
      [
        ActivityTypes.EarlyCare,
        earlyCare.earlyCareParticipationMonday ? `Ja (${earlyCare.earlyCareStartMonday})` : 'Nein',
        earlyCare.earlyCareParticipationTuesday ? `Ja (${earlyCare.earlyCareStartTuesday})` : 'Nein',
        earlyCare.earlyCareParticipationWednesday ? `Ja (${earlyCare.earlyCareStartWednesday})` : 'Nein',
        earlyCare.earlyCareParticipationThursday ? `Ja (${earlyCare.earlyCareStartThursday})` : 'Nein',
        earlyCare.earlyCareParticipationFriday ? `Ja (${earlyCare.earlyCareStartFriday})` : 'Nein',
      ],
      [
        ActivityTypes.Lunch,
        lunch.lunchParticipationMonday ? `Ja (${childClass.lunchMonday} Uhr)` : 'Nein',
        lunch.lunchParticipationTuesday ? `Ja (${childClass.lunchTuesday} Uhr)` : 'Nein',
        lunch.lunchParticipationWednesday ? `Ja (${childClass.lunchWednesday} Uhr)` : 'Nein',
        lunch.lunchParticipationThursday ? `Ja (${childClass.lunchThursday} Uhr)` : 'Nein',
        lunch.lunchParticipationFriday ? `Ja (${childClass.lunchFriday} Uhr)` : 'Nein',
      ],
      [
        ActivityTypes.Homework,
        homework.homeworkParticipationMonday ? `Ja (${childClass.homeworkMonday} Uhr)` : 'Nein',
        homework.homeworkParticipationTuesday ? `Ja (${childClass.homeworkTuesday} Uhr)` : 'Nein',
        homework.homeworkParticipationWednesday ? `Ja (${childClass.homeworkWednesday} Uhr)` : 'Nein',
        homework.homeworkParticipationThursday ? `Ja (${childClass.homeworkThursday} Uhr)` : 'Nein',
        homework.homeworkParticipationFriday ? `Ja (${childClass.homeworkFriday} Uhr)` : 'Nein',
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
        pickup.pickupTimeMonday ? `${pickup.pickupTypeMonday} (${pickup.pickupTimeMonday} Uhr)` : '-',
        pickup.pickupTimeTuesday ? `${pickup.pickupTypeTuesday} ${pickup.pickupTimeTuesday} Uhr ()` : '-',
        pickup.pickupTimeWednesday ? `${pickup.pickupTypeWednesday} ${pickup.pickupTimeWednesday} Uhr ()` : '-',
        pickup.pickupTimeThursday ? `${pickup.pickupTypeThursday} ${pickup.pickupTimeThursday} Uhr ()` : '-',
        pickup.pickupTimeFriday ? `${pickup.pickupTypeFriday} ${pickup.pickupTimeFriday} Uhr ()` : '-',
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

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument */
import { Injectable, inject } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
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

const PDF_EXTENSION = '.pdf';

// Brand color reused from ExcelService header row (#7ac9ff)
const BRAND_HEADER_RGB: [number, number, number] = [122, 201, 255];
const BRAND_TEXT_RGB: [number, number, number] = [0, 0, 0];

// Switch to landscape once a list has more than this many columns.
// Rationale: lists include dynamic day columns per month and become too
// cramped on A4 portrait beyond this threshold.
const LANDSCAPE_COLUMN_THRESHOLD = 7;

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  readonly toastService = inject(ToastService);

  export(element: any[], fileName: string, heading: string) {
    if (!element || element.length === 0) {
      this.toastService.showErrorToast('Erstellen fehlgeschlagen', 'Liste würde keine Einträge enthalten.');
      return;
    }

    const columns = Object.keys(element[0] as object);
    const orientation = columns.length > LANDSCAPE_COLUMN_THRESHOLD ? 'landscape' : 'portrait';
    const doc = new jsPDF({ orientation, unit: 'pt', format: 'a4' });

    this.drawHeading(doc, heading);

    const body = element.map((row) => columns.map((col) => this.stringify(row[col])));

    autoTable(doc, {
      head: [columns],
      body,
      startY: 80,
      styles: { fontSize: 9, cellPadding: 4, textColor: BRAND_TEXT_RGB, overflow: 'linebreak' },
      headStyles: { fillColor: BRAND_HEADER_RGB, textColor: BRAND_TEXT_RGB, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { top: 80, right: 32, bottom: 48, left: 32 },
      didDrawPage: () => this.drawFooter(doc),
    });

    this.download(doc, fileName);
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

    // prepare data (same shape as ExcelService.exportActivities)
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

    const header = ['', ...Object.values(Days)];
    const body: string[][] = [
      this.buildParticipationRow(ActivityTypes.EarlyCare, ec, (day) => `Ja (${ec(day)?.start ?? ''})`),
      this.buildNoteRow(ec),
      this.buildParticipationRow(ActivityTypes.Lunch, lu, (day) => `Ja (${cs(day)?.lunchTime ?? ''} Uhr)`),
      this.buildNoteRow(lu),
      this.buildParticipationRow(ActivityTypes.Homework, hw, (day) => `Ja (${cs(day)?.homeworkTime ?? ''} Uhr)`),
      this.buildNoteRow(hw),
      [ActivityTypes.Courses, ...Object.values(Days).map((day) => this.getCoursesByDay(selectedCourses, day))],
      this.buildPickupRow(pu),
      this.buildNoteRow(pu),
    ];

    const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    this.drawHeading(doc, `${child.firstName} ${child.lastName}`);

    autoTable(doc, {
      head: [header],
      body,
      startY: 80,
      styles: { fontSize: 9, cellPadding: 4, textColor: BRAND_TEXT_RGB, overflow: 'linebreak' },
      headStyles: { fillColor: BRAND_HEADER_RGB, textColor: BRAND_TEXT_RGB, fontStyle: 'bold' },
      columnStyles: { 0: { fontStyle: 'bold' } },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { top: 80, right: 32, bottom: 48, left: 32 },
      didDrawPage: () => this.drawFooter(doc),
    });

    this.download(doc, `Aktivitäten_${child.firstName}_${child.lastName}`);
  }

  download(doc: jsPDF, fileName: string) {
    doc.save(`${fileName}${PDF_EXTENSION}`);
  }

  private drawHeading(doc: jsPDF, heading: string) {
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text(heading, pageWidth / 2, 48, { align: 'center' });
    doc.setFont('helvetica', 'normal');
  }

  private drawFooter(doc: jsPDF) {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageNumber = doc.getNumberOfPages();
    const created = new Date().toLocaleDateString('de-DE');

    doc.setFontSize(8);
    doc.setTextColor(120);
    doc.text(`Erstellt am ${created}`, 32, pageHeight - 20);
    doc.text('OGS Planer', pageWidth / 2, pageHeight - 20, { align: 'center' });
    doc.text(`Seite ${pageNumber}`, pageWidth - 32, pageHeight - 20, { align: 'right' });
    doc.setTextColor(0);
  }

  private stringify(value: unknown): string {
    if (value === null || value === undefined) return '';
    return String(value);
  }

  private buildParticipationRow(
    label: string,
    lookup: (day: string) => { participation?: number } | undefined,
    getInfo: (day: string) => string
  ): string[] {
    return [label, ...Object.values(Days).map((day) => (lookup(day)?.participation ? getInfo(day) : 'Nein'))];
  }

  private buildNoteRow(lookup: (day: string) => { note?: string } | undefined): string[] {
    return ['- Notiz', ...Object.values(Days).map((day) => lookup(day)?.note ?? ' ')];
  }

  private buildPickupRow(pu: (day: string) => { pickupTime?: string; pickupType?: string } | undefined): string[] {
    return [
      ActivityTypes.Pickup,
      ...Object.values(Days).map((day) => {
        const entry = pu(day);
        return entry?.pickupTime ? `${entry.pickupType} (${entry.pickupTime} Uhr)` : '-';
      }),
    ];
  }

  private getCoursesByDay(courses: Course[], day: Days): string {
    const coursesForDay = courses.filter((course) => course.day === day);
    if (coursesForDay.length === 0) return '-';
    return coursesForDay.map((course) => `${course.name} (${course.start} Uhr)`).join(', ');
  }
}

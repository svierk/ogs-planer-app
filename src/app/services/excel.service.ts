/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx-js-style';
import { ToastService } from './toast.service';

const EXCEL_EXTENSION = '.xlsx'; // excel file extension

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor(private toastService: ToastService) {}

  exportToExcel(element: any[], fileName: string, heading: string) {
    if (!element || element.length === 0) {
      this.toastService.showErrorToast('Erstellen fehlgeschlagen', 'Liste würde keine Einträge enthalten.');
      return;
    }

    // generate workbook
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

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
    XLSX.utils.book_append_sheet(workbook, ws, 'Liste');

    // add heading row
    XLSX.utils.sheet_add_json(workbook.Sheets['Liste'], [{ note: heading }], {
      header: ['note'],
      skipHeader: true,
      origin: 0,
    });
    ws['A1'].s = { alignment: { horizontal: 'center', vertical: 'center' }, font: { sz: 20 } };
    ws['!rows'] = [{ hpt: 50 }];

    this.downloadExcel(workbook, fileName);
  }

  downloadExcel(workbook: XLSX.WorkBook, fileName: string) {
    XLSX.writeFile(workbook, `${fileName}${EXCEL_EXTENSION}`);
  }
}

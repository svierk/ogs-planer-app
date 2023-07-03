/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx-js-style';

const EXCEL_EXTENSION = '.xlsx'; // excel file extension

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  exportToExcel(element: any[], fileName: string) {
    // generate workbook
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // add the worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element);

    // count available columns
    const colCount = Object.keys(element[0] as object).length;

    // create array of column names, e.g. ['A1','B1'], and default column widths
    const colNames = [];
    const colWidths = [];
    for (let i = 0; i < colCount; i++) {
      colNames.push(`${String.fromCharCode(i + 65)}1`);
      colWidths.push({ wch: 10 });
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

    // save to file
    XLSX.utils.book_append_sheet(workbook, ws, 'Liste');
    XLSX.writeFile(workbook, `${fileName}${EXCEL_EXTENSION}`);
  }
}

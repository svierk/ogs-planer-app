import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Child } from 'src/app/models/child';
import { DbService } from 'src/app/services/db.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'ogs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  children: Child[] = [];

  constructor(private cdr: ChangeDetectorRef, private dbService: DbService, private excelService: ExcelService) {}

  ngOnInit() {
    this.dbService.children.subscribe((value) => {
      this.children = value;
      this.cdr.detectChanges();
    });
  }

  exportChildrenList() {
    const list = this.children.map(({ id, firstName, lastName, phone }) => ({
      Id: id,
      Vorname: firstName,
      Nachname: lastName,
      Telefon: phone,
    }));
    this.excelService.exportToExcel(list, `liste-${new Date().getTime()}`);
  }
}

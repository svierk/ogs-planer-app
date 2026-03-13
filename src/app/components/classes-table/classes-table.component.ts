import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatNoDataRow } from '@angular/material/table';
import { Class } from 'src/app/models/class';
import { DbService } from 'src/app/services/db.service';
import { SearchService } from 'src/app/services/search.service';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { ClassesCreateUpdateActionComponent } from '../classes-create-update-action/classes-create-update-action.component';
import { ClassesDeleteActionComponent } from '../classes-delete-action/classes-delete-action.component';

@Component({
    selector: 'ogs-classes-table',
    templateUrl: './classes-table.component.html',
    styleUrls: ['./classes-table.component.scss'],
    standalone: true,
    imports: [
        MatFormField,
        MatLabel,
        MatInput,
        MatIcon,
        MatSuffix,
        ClassesCreateUpdateActionComponent,
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatSortHeader,
        MatCellDef,
        MatCell,
        ClassesDeleteActionComponent,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        MatNoDataRow,
    ],
})
export class ClassesTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  classes: Class[] = [];
  displayedColumns: string[] = ['name', 'teacher', 'actions'];
  dataSource!: MatTableDataSource<Class>;

  constructor(
    readonly dbService: DbService,
    readonly searchService: SearchService,
    readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dbService.classes.subscribe((value) => {
      this.classes = value;
      this.dataSource = new MatTableDataSource(this.classes);
      this.sortData({ active: 'name', direction: 'asc' });
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  search(event: Event) {
    this.dataSource = this.searchService.search(event, this.dataSource);
  }

  sortData(sort: Sort) {
    this.dataSource = this.searchService.sort(sort, this.dataSource);
    this.dataSource.sort = this.sort;
  }
}

import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatNoDataRow } from '@angular/material/table';
import { Course } from 'src/app/models/course';
import { DbService } from 'src/app/services/db.service';
import { SearchService } from 'src/app/services/search.service';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { CoursesCreateUpdateActionComponent } from '../courses-create-update-action/courses-create-update-action.component';
import { CoursesDeleteActionComponent } from '../courses-delete-action/courses-delete-action.component';

@Component({
    selector: 'ogs-courses-table',
    templateUrl: './courses-table.component.html',
    styleUrls: ['./courses-table.component.scss'],
    standalone: true,
    imports: [
        MatFormField,
        MatLabel,
        MatInput,
        MatIcon,
        MatSuffix,
        CoursesCreateUpdateActionComponent,
        MatTable,
        MatSort,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        MatSortHeader,
        MatCellDef,
        MatCell,
        CoursesDeleteActionComponent,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        MatNoDataRow,
    ],
})
export class CoursesTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  courses: Course[] = [];
  displayedColumns: string[] = ['name', 'teacher', 'day', 'start', 'end', 'note', 'actions'];
  dataSource!: MatTableDataSource<Course>;

  constructor(
    readonly dbService: DbService,
    readonly searchService: SearchService,
    readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dbService.courses.subscribe((value) => {
      this.courses = value;
      this.dataSource = new MatTableDataSource(this.courses);
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

import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/app/models/course';
import { DbService } from 'src/app/services/db.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'ogs-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss'],
  standalone: false,
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

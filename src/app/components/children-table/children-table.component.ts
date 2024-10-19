import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChildCourse } from 'src/app/models/child-course';
import { Class } from 'src/app/models/class';
import { Course } from 'src/app/models/course';
import { EarlyCare } from 'src/app/models/early-care';
import { Homework } from 'src/app/models/homework';
import { Lunch } from 'src/app/models/lunch';
import { Pickup } from 'src/app/models/pickup';
import { ClassNamePipe } from 'src/app/pipes/class-name.pipe';
import { DbService } from 'src/app/services/db.service';
import { ExcelService } from 'src/app/services/excel.service';
import { SearchService } from 'src/app/services/search.service';
import { Child } from '../../models/child';

@Component({
  selector: 'ogs-children-table',
  templateUrl: './children-table.component.html',
  styleUrls: ['./children-table.component.scss'],
  providers: [ClassNamePipe],
})
export class ChildrenTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  children: Child[] = [];
  classes: Class[] = [];
  courses!: Course[];
  earlyCare!: EarlyCare[];
  lunch!: Lunch[];
  homework!: Homework[];
  childCourses!: ChildCourse[];
  pickup!: Pickup[];
  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'mobile', 'emergencyContact', 'classId', 'actions'];
  dataSource!: MatTableDataSource<Child>;

  constructor(
    readonly dbService: DbService,
    readonly excelService: ExcelService,
    readonly searchService: SearchService,
    readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.dbService.children.subscribe((value) => {
      this.children = value;
      this.dataSource = new MatTableDataSource(this.children);
      this.sortData({ active: 'firstName', direction: 'asc' });
      this.cdr.detectChanges();
    });
    this.dbService.classes.subscribe((value) => {
      this.classes = value;
      this.cdr.detectChanges();
    });
    this.dbService.courses.subscribe((value) => {
      this.courses = value;
    });
    this.dbService.earlyCare.subscribe((value) => {
      this.earlyCare = value;
    });
    this.dbService.lunch.subscribe((value) => {
      this.lunch = value;
    });
    this.dbService.homework.subscribe((value) => {
      this.homework = value;
    });
    this.dbService.childCourses.subscribe((value) => {
      this.childCourses = value;
    });
    this.dbService.pickup.subscribe((value) => {
      this.pickup = value;
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

  download(child: Child) {
    this.excelService.exportActivities({
      child: child,
      childClass: this.classes.find((c) => c.id === parseInt(child?.classId as string)),
      courses: this.courses,
      earlyCare: this.earlyCare.find((item) => item.childId === child.id),
      lunch: this.lunch.find((item) => item.childId === child.id),
      homework: this.homework.find((item) => item.childId === child.id),
      childCourses: this.childCourses.filter((item) => item.childId === child.id),
      pickup: this.pickup.find((item) => item.childId === child.id),
    });
  }
}

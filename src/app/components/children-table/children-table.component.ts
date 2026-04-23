import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatSort, Sort, MatSortHeader } from '@angular/material/sort';
import {
  MatTableDataSource,
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow,
  MatNoDataRow,
} from '@angular/material/table';
import { ChildCourse } from 'src/app/models/child-course';
import { Class } from 'src/app/models/class';
import { ClassSchedule } from 'src/app/models/class-schedule';
import { Course } from 'src/app/models/course';
import { EarlyCare } from 'src/app/models/early-care';
import { Homework } from 'src/app/models/homework';
import { Lunch } from 'src/app/models/lunch';
import { Pickup } from 'src/app/models/pickup';
import { ClassNamePipe } from 'src/app/pipes/class-name.pipe';
import { DbService } from 'src/app/services/db.service';
import { ExcelService } from 'src/app/services/excel.service';
import { PdfService } from 'src/app/services/pdf.service';
import { SearchService } from 'src/app/services/search.service';
import { Child } from '../../models/child';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { ChildrenCreateUpdateActionComponent } from '../children-create-update-action/children-create-update-action.component';
import { ChildrenActivitiesActionComponent } from '../children-activities-action/children-activities-action.component';
import { MatIconButton } from '@angular/material/button';
import { ChildrenDeleteActionComponent } from '../children-delete-action/children-delete-action.component';
import { ClassNamePipe as ClassNamePipe_1 } from '../../pipes/class-name.pipe';

@Component({
  selector: 'ogs-children-table',
  templateUrl: './children-table.component.html',
  styleUrls: ['./children-table.component.scss'],
  providers: [ClassNamePipe],
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatIcon,
    MatSuffix,
    ChildrenCreateUpdateActionComponent,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatSortHeader,
    MatCellDef,
    MatCell,
    ChildrenActivitiesActionComponent,
    MatIconButton,
    ChildrenDeleteActionComponent,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatNoDataRow,
    ClassNamePipe_1,
  ],
})
export class ChildrenTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  readonly dbService = inject(DbService);
  readonly excelService = inject(ExcelService);
  readonly pdfService = inject(PdfService);
  readonly searchService = inject(SearchService);
  readonly cdr = inject(ChangeDetectorRef);
  children: Child[] = [];
  classes: Class[] = [];
  classSchedules: ClassSchedule[] = [];
  courses!: Course[];
  earlyCare!: EarlyCare[];
  lunch!: Lunch[];
  homework!: Homework[];
  childCourses!: ChildCourse[];
  pickup!: Pickup[];
  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'mobile', 'emergencyContact', 'classId', 'actions'];
  dataSource!: MatTableDataSource<Child>;

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
    this.dbService.classSchedules.subscribe((value) => {
      this.classSchedules = value;
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

  download(child: Child, format: 'excel' | 'pdf' = 'excel') {
    const classId = child.classId ? Number.parseInt(child.classId) : undefined;
    const payload = {
      child: child,
      childClass: classId ? this.classes.find((c) => c.id === classId) : undefined,
      classSchedules: classId ? this.classSchedules.filter((s) => s.classId === classId) : [],
      courses: this.courses,
      earlyCare: this.earlyCare.filter((item) => item.childId === child.id),
      lunch: this.lunch.filter((item) => item.childId === child.id),
      homework: this.homework.filter((item) => item.childId === child.id),
      childCourses: this.childCourses.filter((item) => item.childId === child.id),
      pickup: this.pickup.filter((item) => item.childId === child.id),
    };

    if (format === 'pdf') {
      this.pdfService.exportActivities(payload);
    } else {
      this.excelService.exportActivities(payload);
    }
  }
}

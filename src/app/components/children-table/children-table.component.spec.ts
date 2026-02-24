import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Child } from 'src/app/models/child';
import { ChildCourse } from 'src/app/models/child-course';
import { Class } from 'src/app/models/class';
import { Course } from 'src/app/models/course';
import { Days } from 'src/app/models/days';
import { EarlyCare } from 'src/app/models/early-care';
import { Homework } from 'src/app/models/homework';
import { Lunch } from 'src/app/models/lunch';
import { Pickup } from 'src/app/models/pickup';
import { ExcelService } from 'src/app/services/excel.service';
import { ChildrenCreateUpdateActionComponent } from '../children-create-update-action/children-create-update-action.component';
import { ChildrenDeleteActionComponent } from '../children-delete-action/children-delete-action.component';
import { ChildrenTableComponent } from './children-table.component';

const children: Child[] = [{ id: 123, firstName: 'test', lastName: 'child', classId: '123' }];
const classes: Class[] = [{ id: 123, name: '1a' }];
const courses: Course[] = [
  {
    id: 123,
    name: 'course',
    teacher: 'teacher',
    day: Days.Monday,
    start: 'start',
    end: 'end',
  },
];
const earlyCare: EarlyCare[] = [{ id: 123, childId: 123, day: 'Montag', participation: 1, start: '1. Stunde' }];
const lunch: Lunch[] = [{ id: 123, childId: 123, day: 'Montag', participation: 1, note: 'note' }];
const homework: Homework[] = [{ id: 123, childId: 123, day: 'Montag', participation: 1, note: 'note' }];
const childCourses: ChildCourse[] = [{ id: 123, childId: 123, courseId: 123 }];
const pickup: Pickup[] = [
  { id: 123, childId: 123, day: 'Montag', pickupTime: '12:00', pickupType: 'Wird abgeholt', note: 'note' },
];

describe('ChildrenTableComponent', () => {
  let component: ChildrenTableComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<ChildrenTableComponent>;

  beforeEach(() => {
    const excelService: Partial<ExcelService> = {
      exportActivities: jasmine.createSpy('exportActivities'),
    };

    TestBed.configureTestingModule({
      declarations: [ChildrenCreateUpdateActionComponent, ChildrenDeleteActionComponent, ChildrenTableComponent],
      imports: [
        BrowserAnimationsModule,
        BrowserDynamicTestingModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSortModule,
        MatTableModule,
      ],
      providers: [{ provide: ExcelService, useValue: excelService }],
    });
    fixture = TestBed.createComponent(ChildrenTableComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow search', () => {
    // given
    component.children = children;
    component.dataSource = new MatTableDataSource(children);

    // when
    const input = debugElement.query(By.css('input'));
    const inputElement = input.nativeElement;
    inputElement.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();

    // then
    expect(component.dataSource.filter).toEqual('');
  });

  it('should allow sorting', () => {
    // given
    component.children = children;
    component.dataSource = new MatTableDataSource(children);

    // when
    component.sortData({ active: 'firstName', direction: 'asc' } as Sort);
    fixture.detectChanges();

    // then
    expect(component.sort.active).toEqual('firstName');
    expect(component.sort.direction).toEqual('asc');
  });

  it('should allow download of child activites', () => {
    // given
    component.children = children;
    component.classes = classes;
    component.courses = courses;
    component.earlyCare = earlyCare;
    component.lunch = lunch;
    component.homework = homework;
    component.childCourses = childCourses;
    component.pickup = pickup;
    component.dataSource = new MatTableDataSource(children);
    spyOn(component, 'download').and.callThrough();

    // when
    component.download(children[0]);
    fixture.detectChanges();

    // then
    expect(component.download).toHaveBeenCalledTimes(1);
  });

  it('should allow download of child activities without class assignment', () => {
    // given
    const childWithoutClass: Child = { id: 456, firstName: 'no', lastName: 'class' };
    component.children = [childWithoutClass];
    component.classes = classes;
    component.classSchedules = [];
    component.courses = courses;
    component.earlyCare = earlyCare;
    component.lunch = lunch;
    component.homework = homework;
    component.childCourses = childCourses;
    component.pickup = pickup;
    component.dataSource = new MatTableDataSource([childWithoutClass]);
    spyOn(component, 'download').and.callThrough();

    // when
    component.download(childWithoutClass);
    fixture.detectChanges();

    // then
    expect(component.download).toHaveBeenCalledTimes(1);
  });
});

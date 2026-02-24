import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivityTypes } from 'src/app/models/activity-types';
import { Child } from 'src/app/models/child';
import { ChildCourse } from 'src/app/models/child-course';
import { Class } from 'src/app/models/class';
import { ClassSchedule } from 'src/app/models/class-schedule';
import { Course } from 'src/app/models/course';
import { Days } from 'src/app/models/days';
import { EarlyCare } from 'src/app/models/early-care';
import { Homework } from 'src/app/models/homework';
import { InformationTypes } from 'src/app/models/information-types';
import { Lunch } from 'src/app/models/lunch';
import { Pickup } from 'src/app/models/pickup';
import { DbService } from 'src/app/services/db.service';
import { ExcelService } from 'src/app/services/excel.service';
import { DashboardListDialogComponent } from './dashboard-list-dialog.component';

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
const classSchedules: ClassSchedule[] = [
  { id: 1, classId: 123, day: 'Montag', lunchTime: '12:00', homeworkTime: '13:00' },
];
const earlyCare: EarlyCare[] = [
  { id: 123, childId: 123, day: 'Montag', participation: 1, start: '1. Stunde', note: 'note' },
];
const lunch: Lunch[] = [{ id: 123, childId: 123, day: 'Montag', participation: 1, note: 'note' }];
const homework: Homework[] = [{ id: 123, childId: 123, day: 'Montag', participation: 1, note: 'note' }];
const childCourses: ChildCourse[] = [{ id: 123, childId: 123, courseId: 123 }];
const pickup: Pickup[] = [
  { id: 123, childId: 123, day: 'Montag', pickupTime: '12:00', pickupType: 'Wird abgeholt', note: 'note' },
];

describe('DashboardListDialogComponent', () => {
  let component: DashboardListDialogComponent;
  let fixture: ComponentFixture<DashboardListDialogComponent>;

  beforeEach(() => {
    const excelService: Partial<ExcelService> = {
      export: jasmine.createSpy('export'),
    };

    TestBed.configureTestingModule({
      declarations: [DashboardListDialogComponent],
      imports: [
        BrowserAnimationsModule,
        BrowserDynamicTestingModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
      ],
      providers: [
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        { provide: MatDialogRef, useFactory: () => jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed']) },
        {
          provide: MAT_DIALOG_DATA,
          useValue: null,
        },
        { provide: ExcelService, useValue: excelService },
        DbService,
      ],
    });
    fixture = TestBed.createComponent(DashboardListDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should export early care list', () => {
    // given
    component.children = children;
    component.classes = classes;
    component.classSchedules = classSchedules;
    component.earlyCare = earlyCare;
    component.type = ActivityTypes.EarlyCare;
    spyOn(component, 'submit').and.callThrough();

    // when
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    button.click();
    fixture.detectChanges();

    // then
    expect(component.submit).toHaveBeenCalledTimes(1);
  });

  it('should export lunch list', () => {
    // given
    component.children = children;
    component.classes = classes;
    component.classSchedules = classSchedules;
    component.lunch = lunch;
    component.type = ActivityTypes.Lunch;
    spyOn(component, 'submit').and.callThrough();

    // when
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    button.click();
    fixture.detectChanges();

    // then
    expect(component.submit).toHaveBeenCalledTimes(1);
  });

  it('should export homework list', () => {
    // given
    component.children = children;
    component.classes = classes;
    component.classSchedules = classSchedules;
    component.homework = homework;
    component.type = ActivityTypes.Homework;
    spyOn(component, 'submit').and.callThrough();

    // when
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    button.click();
    fixture.detectChanges();

    // then
    expect(component.submit).toHaveBeenCalledTimes(1);
  });

  it('should export child course list', () => {
    // given
    component.children = children;
    component.classes = classes;
    component.courses = courses;
    component.childCourses = childCourses;
    component.type = ActivityTypes.Courses;
    spyOn(component, 'submit').and.callThrough();

    // when
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    button.click();
    fixture.detectChanges();

    // then
    expect(component.submit).toHaveBeenCalledTimes(1);
  });

  it('should export pickup list', () => {
    // given
    component.children = children;
    component.classes = classes;
    component.classSchedules = classSchedules;
    component.pickup = pickup;
    component.type = ActivityTypes.Pickup;
    spyOn(component, 'submit').and.callThrough();

    // when
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    button.click();
    fixture.detectChanges();

    // then
    expect(component.submit).toHaveBeenCalledTimes(1);
  });

  it('should export emergency contacts list', () => {
    // given
    component.children = children;
    component.classes = classes;
    component.type = InformationTypes.EmergencyContacts;
    spyOn(component, 'submit').and.callThrough();

    // when
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    button.click();
    fixture.detectChanges();

    // then
    expect(component.submit).toHaveBeenCalledTimes(1);
  });

  it('should export pickup authorizations list', () => {
    // given
    component.children = children;
    component.classes = classes;
    component.type = InformationTypes.PickupAuthorizations;
    spyOn(component, 'submit').and.callThrough();

    // when
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    button.click();
    fixture.detectChanges();

    // then
    expect(component.submit).toHaveBeenCalledTimes(1);
  });

  it('should export allergies list', () => {
    // given
    component.children = children;
    component.classes = classes;
    component.type = InformationTypes.Allergies;
    spyOn(component, 'submit').and.callThrough();

    // when
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    button.click();
    fixture.detectChanges();

    // then
    expect(component.submit).toHaveBeenCalledTimes(1);
  });

  it('should do nothing without specified type', () => {
    // given
    component.children = children;
    component.classes = classes;
    spyOn(component, 'submit').and.callThrough();

    // when
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    button.click();
    fixture.detectChanges();

    // then
    expect(component.submit).toHaveBeenCalledTimes(1);
  });
});

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
import { Course } from 'src/app/models/course';
import { Days } from 'src/app/models/days';
import { InformationTypes } from 'src/app/models/information-types';
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
const earlyCare: any[] = [
  {
    id: 123,
    childId: 123,
    earlyCareParticipationMonday: 1,
    earlyCareStartMonday: '1. Stunde',
  },
];
const lunch: any[] = [
  {
    id: 123,
    childId: 123,
    lunchParticipationMonday: 1,
    lunchNoteMonday: 'note',
  },
];
const homework: any[] = [
  {
    id: 123,
    childId: 123,
    homeworkParticipationMonday: 1,
    homeworkNoteMonday: 'note',
  },
];
const childCourses: ChildCourse[] = [{ id: 123, childId: 123, courseId: 123 }];
const pickup: any[] = [
  {
    id: 123,
    childId: 123,
    pickupTimeMonday: '12:00',
    pickupTypeMonday: 'Wird abgeholt',
    pickupNoteMonday: 'note',
  },
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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Child } from 'src/app/models/child';
import { Course } from 'src/app/models/course';
import { Days } from 'src/app/models/days';
import { DbService } from 'src/app/services/db.service';
import { ChildrenActivitiesDialogComponent } from './children-activities-dialog.component';

const child: Child = { id: 123, firstName: 'test', lastName: 'child', classId: '123' };
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
const earlyCare: any[] = [{ id: 123, childId: 123 }];
const lunch: any[] = [{ id: 123, childId: 123 }];
const homework: any[] = [{ id: 123, childId: 123 }];
const childCourses: any[] = [{ id: 123, childId: 123, courseId: 123 }];
const pickup: any[] = [{ id: 123, childId: 123 }];

describe('ChildrenActivitiesDialogComponent', () => {
  let component: ChildrenActivitiesDialogComponent;
  let fixture: ComponentFixture<ChildrenActivitiesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildrenActivitiesDialogComponent],
      imports: [
        BrowserAnimationsModule,
        BrowserDynamicTestingModule,
        MatCardModule,
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
        DbService,
      ],
    });
    fixture = TestBed.createComponent(ChildrenActivitiesDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize children activities form as valid', () => {
    // given
    component.child = child;
    component.courses = courses;
    component.earlyCare = earlyCare;
    component.lunch = lunch;
    component.homework = homework;
    component.childCourses = childCourses;
    component.pickup = pickup;

    // when
    fixture.detectChanges();

    // then
    expect(component.activitiesForm.valid).toEqual(true);
  });

  it('should create children activities', () => {
    // given
    spyOn(component.dbService, 'createEarlyCare');
    spyOn(component.dbService, 'createLunch');
    spyOn(component.dbService, 'createHomework');
    spyOn(component.dbService, 'createPickup');
    spyOn(component.dbService, 'createChildCourses');
    spyOn(component.dbService, 'getEarlyCare');
    spyOn(component.dbService, 'getLunch');
    spyOn(component.dbService, 'getHomework');
    spyOn(component.dbService, 'getChildCourses');
    spyOn(component.dbService, 'getPickup');
    component.child = child;
    component.courses = courses;
    component.childCourses = childCourses;

    // when
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    button.click();
    fixture.detectChanges();

    // then
    expect(component).toBeTruthy();
  });

  it('should update children activities', () => {
    // given
    spyOn(component.dbService, 'updateEarlyCare');
    spyOn(component.dbService, 'updateLunch');
    spyOn(component.dbService, 'updateHomework');
    spyOn(component.dbService, 'updatePickup');
    spyOn(component.dbService, 'updateChildCourses');
    spyOn(component.dbService, 'getEarlyCare');
    spyOn(component.dbService, 'getLunch');
    spyOn(component.dbService, 'getHomework');
    spyOn(component.dbService, 'getChildCourses');
    spyOn(component.dbService, 'getPickup');
    component.child = child;
    component.courses = courses;
    component.earlyCare = earlyCare;
    component.lunch = lunch;
    component.homework = homework;
    component.childCourses = childCourses;
    component.pickup = pickup;

    // when
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    button.click();
    fixture.detectChanges();

    // then
    expect(component).toBeTruthy();
  });
});

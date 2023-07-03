import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivityTypes } from 'src/app/models/activity-types';
import { Child } from 'src/app/models/child';
import { Class } from 'src/app/models/class';
import { EarlyCare } from 'src/app/models/early-care';
import { DbService } from 'src/app/services/db.service';
import { ExcelService } from 'src/app/services/excel.service';
import { DashboardListDialogComponent } from './dashboard-list-dialog.component';

const children: Child[] = [{ id: 123, firstName: 'test', lastName: 'child', classId: '123' }];
const classes: Class[] = [{ id: 123, name: '1a' }];
const earlyCare: EarlyCare[] = [
  {
    id: 123,
    childId: 123,
    earlyCareParticipationMonday: 1,
    earlyCareParticipationTuesday: 1,
    earlyCareParticipationWednesday: 1,
    earlyCareParticipationThursday: 1,
    earlyCareParticipationFriday: 1,
    earlyCareStartMonday: '1. Stunde',
    earlyCareStartTuesday: '1. Stunde',
    earlyCareStartWednesday: '1. Stunde',
    earlyCareStartThursday: '1. Stunde',
    earlyCareStartFriday: '1. Stunde',
  },
];

describe('DashboardListDialogComponent', () => {
  let component: DashboardListDialogComponent;
  let fixture: ComponentFixture<DashboardListDialogComponent>;

  beforeEach(() => {
    const excelService: Partial<ExcelService> = {
      exportToExcel: jasmine.createSpy('exportToExcel'),
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
    fixture.detectChanges();
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
});

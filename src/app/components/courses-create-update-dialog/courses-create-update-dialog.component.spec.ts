import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Days } from 'src/app/models/days';
import { DbService } from 'src/app/services/db.service';
import { CoursesCreateUpdateDialogComponent } from './courses-create-update-dialog.component';

describe('CoursesCreateUpdateDialogComponent', () => {
  let component: CoursesCreateUpdateDialogComponent;
  let fixture: ComponentFixture<CoursesCreateUpdateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesCreateUpdateDialogComponent],
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
        DbService,
      ],
    });
    fixture = TestBed.createComponent(CoursesCreateUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create course', () => {
    // given
    spyOn(component.dbService, 'createCourse');
    spyOn(component.dbService, 'getCourses');
    spyOn(component, 'submit').and.callThrough();
    component.name?.setValue('course');
    component.teacher?.setValue('teacher');
    component.start?.setValue('start');
    component.end?.setValue('end');

    // when
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    button.click();
    fixture.detectChanges();

    // then
    expect(component.submit).toHaveBeenCalledTimes(1);
  });

  it('should update course', () => {
    // given
    spyOn(component.dbService, 'updateCourse');
    spyOn(component.dbService, 'getCourses');
    spyOn(component, 'submit').and.callThrough();
    component.name?.setValue('course');
    component.teacher?.setValue('teacher');
    component.start?.setValue('start');
    component.end?.setValue('end');
    component.course = {
      name: 'course',
      teacher: 'teacher',
      day: Days.Monday,
      start: 'start',
      end: 'end',
    };

    // when
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    button.click();
    fixture.detectChanges();

    // then
    expect(component.submit).toHaveBeenCalledTimes(1);
  });
});

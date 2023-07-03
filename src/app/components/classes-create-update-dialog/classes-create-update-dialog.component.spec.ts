import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeworkTimes } from 'src/app/models/homework-times';
import { LunchTimes } from 'src/app/models/lunch-times';
import { DbService } from 'src/app/services/db.service';
import { ClassesCreateUpdateDialogComponent } from './classes-create-update-dialog.component';

describe('ClassesCreateUpdateDialogComponent', () => {
  let component: ClassesCreateUpdateDialogComponent;
  let fixture: ComponentFixture<ClassesCreateUpdateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesCreateUpdateDialogComponent],
      imports: [
        BrowserAnimationsModule,
        BrowserDynamicTestingModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
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
    fixture = TestBed.createComponent(ClassesCreateUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create class', () => {
    // given
    spyOn(component.dbService, 'createClass');
    spyOn(component.dbService, 'getClasses');
    spyOn(component, 'submit').and.callThrough();
    component.name?.setValue('1a');
    component.teacher?.setValue('teacher');

    // when
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    button.click();
    fixture.detectChanges();

    // then
    expect(component.submit).toHaveBeenCalledTimes(1);
  });

  it('should update class', () => {
    // given
    spyOn(component.dbService, 'updateClass');
    spyOn(component.dbService, 'getClasses');
    spyOn(component, 'submit').and.callThrough();
    component.name?.setValue('1a');
    component.classItem = {
      name: '1a',
    };

    // when
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    button.click();
    fixture.detectChanges();

    // then
    expect(component.submit).toHaveBeenCalledTimes(1);
  });

  it('should allow lunch slot change', () => {
    // when
    component.onChange({
      value: LunchTimes.first,
      source: {
        ngControl: {
          name: 'lunchMonday',
        },
      },
    } as MatSelectChange);
    fixture.detectChanges();

    // then
    expect(component.classForm.get('lunchMonday')?.value).toEqual(LunchTimes.first);
  });

  it('should allow homework slot change', () => {
    // when
    component.onChange({
      value: HomeworkTimes.first,
      source: {
        ngControl: {
          name: 'homeworkMonday',
        },
      },
    } as MatSelectChange);
    fixture.detectChanges();

    // then
    expect(component.classForm.get('homeworkMonday')?.value).toEqual(HomeworkTimes.first);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DbService } from 'src/app/services/db.service';
import { CoursesDeleteDialogComponent } from './courses-delete-dialog.component';

describe('CoursesDeleteDialogComponent', () => {
  let component: CoursesDeleteDialogComponent;
  let fixture: ComponentFixture<CoursesDeleteDialogComponent>;

  beforeEach(() => {
    const dbService: Partial<DbService> = {
      deleteCourse: jasmine.createSpy('deleteCourse'),
      getCourses: jasmine.createSpy('getCourses'),
    };

    TestBed.configureTestingModule({
      declarations: [CoursesDeleteDialogComponent],
      imports: [MatDialogModule],
      providers: [
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        { provide: MatDialogRef, useFactory: () => jasmine.createSpyObj('MatDialogRef', ['close', 'afterClosed']) },
        {
          provide: MAT_DIALOG_DATA,
          useValue: null,
        },
        { provide: DbService, useValue: dbService },
      ],
    });
    fixture = TestBed.createComponent(CoursesDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete course after clicking on delete button', () => {
    // given
    spyOn(component, 'deleteCourse').and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');

    // when
    button.click();
    fixture.detectChanges();

    // then
    expect(component.deleteCourse).toHaveBeenCalledTimes(1);
  });

  it('should delete course after pressing enter', () => {
    // given
    spyOn(component, 'deleteCourse').and.callThrough();
    const event = new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13 });

    // when
    globalThis.dispatchEvent(event);

    // then
    expect(component.deleteCourse).toHaveBeenCalledTimes(1);
  });
});

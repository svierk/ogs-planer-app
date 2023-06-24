import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DbService } from 'src/app/services/db.service';
import { ClassesDeleteDialogComponent } from './classes-delete-dialog.component';

describe('ClassesDeleteDialogComponent', () => {
  let component: ClassesDeleteDialogComponent;
  let fixture: ComponentFixture<ClassesDeleteDialogComponent>;

  beforeEach(() => {
    const dbService: Partial<DbService> = {
      deleteClass: jasmine.createSpy('deleteClass'),
      getClasses: jasmine.createSpy('getClasses'),
    };

    TestBed.configureTestingModule({
      declarations: [ClassesDeleteDialogComponent],
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
    fixture = TestBed.createComponent(ClassesDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete class after clicking on delete button', () => {
    // given
    spyOn(component, 'deleteClass').and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');

    // when
    button.click();
    fixture.detectChanges();

    // then
    expect(component.deleteClass).toHaveBeenCalledTimes(1);
  });

  it('should delete class after pressing enter', () => {
    // given
    spyOn(component, 'deleteClass').and.callThrough();
    const event = new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13 });

    // when
    window.dispatchEvent(event);

    // then
    expect(component.deleteClass).toHaveBeenCalledTimes(1);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DbService } from 'src/app/services/db.service';
import { ClassesDeleteDialogComponent } from './classes-delete-dialog.component';

describe('ClassesDeleteDialogComponent', () => {
  let component: ClassesDeleteDialogComponent;
  let fixture: ComponentFixture<ClassesDeleteDialogComponent>;

  beforeEach(() => {
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
        DbService,
      ],
    });
    fixture = TestBed.createComponent(ClassesDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DbService } from 'src/app/services/db.service';
import { ChildrenActivitiesDialogComponent } from './children-activities-dialog.component';

const child = {
  firstName: 'test',
  lastName: 'child',
};

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

  it('should initialize the update internal user form as valid', () => {
    // given
    component.child = child;

    // when
    fixture.detectChanges();

    // then
    expect(component).toBeTruthy();
  });
});

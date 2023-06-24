import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DbService } from 'src/app/services/db.service';
import { ChildrenCreateUpdateDialogComponent } from './children-create-update-dialog.component';

describe('ChildrenCreateUpdateDialogComponent', () => {
  let component: ChildrenCreateUpdateDialogComponent;
  let fixture: ComponentFixture<ChildrenCreateUpdateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildrenCreateUpdateDialogComponent],
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
    fixture = TestBed.createComponent(ChildrenCreateUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create child', () => {
    // given
    spyOn(component.dbService, 'createChild');
    spyOn(component.dbService, 'getChildren');
    spyOn(component, 'submit').and.callThrough();
    component.firstName?.setValue('test');
    component.lastName?.setValue('child');

    // when
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    button.click();
    fixture.detectChanges();

    // then
    expect(component.submit).toHaveBeenCalledTimes(1);
  });

  it('should update child', () => {
    // given
    spyOn(component.dbService, 'updateChild');
    spyOn(component.dbService, 'getChildren');
    spyOn(component, 'submit').and.callThrough();
    component.firstName?.setValue('test');
    component.lastName?.setValue('child');
    component.child = {
      firstName: 'test',
      lastName: 'child',
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

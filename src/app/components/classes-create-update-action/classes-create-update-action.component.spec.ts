import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { ClassesCreateUpdateActionComponent } from './classes-create-update-action.component';

describe('ClassesCreateUpdateActionComponent', () => {
  let component: ClassesCreateUpdateActionComponent;
  let fixture: ComponentFixture<ClassesCreateUpdateActionComponent>;
  let dialogSpy: jasmine.Spy;
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const dialogRefSpyObj: MatDialogRef<unknown, unknown> = jasmine.createSpyObj({ afterClosed: of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesCreateUpdateActionComponent],
      imports: [MatDialogModule, MatIconModule],
    });
    fixture = TestBed.createComponent(ClassesCreateUpdateActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog', () => {
    // when
    component.openDialog();
    fixture.detectChanges();

    // then
    expect(dialogSpy).toHaveBeenCalledTimes(1);
  });
});

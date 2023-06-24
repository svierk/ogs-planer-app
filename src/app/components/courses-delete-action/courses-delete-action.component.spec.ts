import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { Days } from 'src/app/models/days';
import { CoursesDeleteActionComponent } from './courses-delete-action.component';

describe('CoursesDeleteActionComponent', () => {
  let component: CoursesDeleteActionComponent;
  let fixture: ComponentFixture<CoursesDeleteActionComponent>;
  let dialogSpy: jasmine.Spy;
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const dialogRefSpyObj: MatDialogRef<unknown, unknown> = jasmine.createSpyObj({ afterClosed: of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesDeleteActionComponent],
      imports: [MatDialogModule, MatIconModule],
    });
    fixture = TestBed.createComponent(CoursesDeleteActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog', () => {
    // given
    component.course = {
      id: 123,
      name: '',
      teacher: '',
      day: Days.Monday,
      start: '',
      end: '',
    };

    // when
    component.openDialog();
    fixture.detectChanges();

    // then
    expect(dialogSpy).toHaveBeenCalledTimes(1);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { ChildrenDeleteActionComponent } from './children-delete-action.component';

describe('ChildrenDeleteActionComponent', () => {
  let component: ChildrenDeleteActionComponent;
  let fixture: ComponentFixture<ChildrenDeleteActionComponent>;
  let dialogSpy: jasmine.Spy;
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const dialogRefSpyObj: MatDialogRef<unknown, unknown> = jasmine.createSpyObj({ afterClosed: of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChildrenDeleteActionComponent],
      imports: [MatDialogModule, MatIconModule],
    });
    fixture = TestBed.createComponent(ChildrenDeleteActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog', () => {
    // given
    component.child = {
      id: 123,
      firstName: '',
      lastName: '',
    };

    // when
    component.openDialog();
    fixture.detectChanges();

    // then
    expect(dialogSpy).toHaveBeenCalledTimes(1);
  });
});

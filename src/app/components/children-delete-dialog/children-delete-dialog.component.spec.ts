import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DbService } from 'src/app/services/db.service';
import { ChildrenDeleteDialogComponent } from './children-delete-dialog.component';

describe('ChildrenDeleteDialogComponent', () => {
  let component: ChildrenDeleteDialogComponent;
  let fixture: ComponentFixture<ChildrenDeleteDialogComponent>;

  beforeEach(() => {
    const dbService: Partial<DbService> = {
      deleteChild: jasmine.createSpy('deleteChild'),
      getChildren: jasmine.createSpy('getChildren'),
    };

    TestBed.configureTestingModule({
      declarations: [ChildrenDeleteDialogComponent],
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
    fixture = TestBed.createComponent(ChildrenDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete child after clicking on delete button', () => {
    // given
    spyOn(component, 'deleteChild').and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');

    // when
    button.click();
    fixture.detectChanges();

    // then
    expect(component.deleteChild).toHaveBeenCalledTimes(1);
  });

  it('should delete child after pressing enter', () => {
    // given
    spyOn(component, 'deleteChild').and.callThrough();
    const event = new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13 });

    // when
    window.dispatchEvent(event);

    // then
    expect(component.deleteChild).toHaveBeenCalledTimes(1);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { of } from 'rxjs';
import { ActivityTypes } from 'src/app/models/activity-types';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dialogSpy: jasmine.Spy;
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const dialogRefSpyObj: MatDialogRef<unknown, unknown> = jasmine.createSpyObj({ afterClosed: of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, MatIconModule, MatListModule, DashboardComponent],
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog', () => {
    // when
    component.openDialog(ActivityTypes.EarlyCare);
    fixture.detectChanges();

    // then
    expect(dialogSpy).toHaveBeenCalledTimes(1);
  });

  describe('database backup', () => {
    it('should confirm a successful export', () => {
      // given
      spyOn(component.dbService, 'exportDatabase').and.returnValue('/tmp/backup.db');
      const toastSpy = spyOn(component.toastService, 'showSuccessToast');

      // when
      component.exportDatabase();

      // then
      expect(toastSpy).toHaveBeenCalledTimes(1);
    });

    it('should stay silent when the export was cancelled', () => {
      // given
      spyOn(component.dbService, 'exportDatabase').and.returnValue('');
      const toastSpy = spyOn(component.toastService, 'showSuccessToast');

      // when
      component.exportDatabase();

      // then
      expect(toastSpy).not.toHaveBeenCalled();
    });

    it('should report an invalid import file', () => {
      // given
      spyOn(component.dbService, 'importDatabase').and.returnValue('invalid');
      const toastSpy = spyOn(component.toastService, 'showErrorToast');

      // when
      component.importDatabase();

      // then
      expect(toastSpy).toHaveBeenCalledTimes(1);
    });

    it('should stay silent when the import was cancelled', () => {
      // given
      spyOn(component.dbService, 'importDatabase').and.returnValue('');
      const toastSpy = spyOn(component.toastService, 'showErrorToast');

      // when
      component.importDatabase();

      // then
      expect(toastSpy).not.toHaveBeenCalled();
    });
  });
});

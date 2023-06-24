import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ExcelService } from 'src/app/services/excel.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    const excelService: Partial<ExcelService> = {
      exportToExcel: jasmine.createSpy('exportToExcel'),
    };

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [MatIconModule, MatListModule],
      providers: [{ provide: ExcelService, useValue: excelService }],
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should export children list', () => {
    // given
    component.children = [{ firstName: 'test', lastName: 'child' }];
    spyOn(component, 'exportChildrenList').and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector('mat-list-item');

    // when
    button.click();
    fixture.detectChanges();

    // then
    expect(component.exportChildrenList).toHaveBeenCalledTimes(1);
  });
});

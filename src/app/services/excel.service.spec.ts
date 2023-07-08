import { TestBed } from '@angular/core/testing';
import { ExcelService } from './excel.service';

describe('ExcelService', () => {
  let service: ExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should export excel', () => {
    // given
    spyOn(service, 'downloadExcel');
    spyOn(service, 'exportToExcel').and.callThrough();

    // when
    service.exportToExcel([{ test: 'test' }], 'file name', 'heading');

    // then
    expect(service.exportToExcel).toHaveBeenCalledTimes(1);
    expect(service.downloadExcel).toHaveBeenCalledTimes(1);
  });
});

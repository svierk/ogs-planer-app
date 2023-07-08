import { TestBed } from '@angular/core/testing';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SearchService } from './search.service';

const items: any[] = [{ test: 'test' }, { test: 'test' }];

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should allow searching', () => {
    // given
    spyOn(service, 'search').and.callThrough();

    // when
    service.search({ target: {} } as Event, new MatTableDataSource(items));

    // then
    expect(service.search).toHaveBeenCalledTimes(1);
  });

  it('should allow sorting', () => {
    // given
    spyOn(service, 'sort').and.callThrough();

    // when
    service.sort({ active: 'default', direction: '' } as Sort, new MatTableDataSource(items));

    // then
    expect(service.sort).toHaveBeenCalledTimes(1);
  });
});

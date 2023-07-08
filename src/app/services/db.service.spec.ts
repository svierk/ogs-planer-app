import { TestBed } from '@angular/core/testing';
import { DbService } from './db.service';

describe('DbService', () => {
  let service: DbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });
    service = TestBed.inject(DbService);
  });

  it('should be created', () => {
    // given
    const spy = spyOnProperty(service, 'isElectron').and.returnValue(true);

    // then
    expect(service.isElectron).toBe(true);
    expect(spy).toHaveBeenCalledWith();
  });
});

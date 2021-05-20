import { TestBed } from '@angular/core/testing';

import { InjectableDataService } from './injectable-data.service';

describe('InjectableDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InjectableDataService = TestBed.get(InjectableDataService);
    expect(service).toBeTruthy();
  });
});

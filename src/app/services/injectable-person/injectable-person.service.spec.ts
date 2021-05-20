import { TestBed } from '@angular/core/testing';

import { InjectablePersonService } from './injectable-person.service';

describe('InjectablePersonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InjectablePersonService = TestBed.get(InjectablePersonService);
    expect(service).toBeTruthy();
  });
});

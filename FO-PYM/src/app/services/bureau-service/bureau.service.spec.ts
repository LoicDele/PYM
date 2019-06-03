import { TestBed } from '@angular/core/testing';

import { BureauService } from './bureau.service';

describe('BureauService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BureauService = TestBed.get(BureauService);
    expect(service).toBeTruthy();
  });
});

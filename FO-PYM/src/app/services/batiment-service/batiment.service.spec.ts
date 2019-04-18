import { TestBed } from '@angular/core/testing';

import { BatimentService } from './batiment.service';

describe('BatimentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BatimentService = TestBed.get(BatimentService);
    expect(service).toBeTruthy();
  });
});

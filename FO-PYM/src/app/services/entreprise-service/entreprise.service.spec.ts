import { TestBed } from '@angular/core/testing';

import { EntrepriseService } from './entreprise.service';

describe('EntreprisesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntrepriseService = TestBed.get(EntrepriseService);
    expect(service).toBeTruthy();
  });
});

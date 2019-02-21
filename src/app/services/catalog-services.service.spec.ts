import { TestBed } from '@angular/core/testing';

import { CatalogServicesService } from './catalog-services.service';

describe('CatalogServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatalogServicesService = TestBed.get(CatalogServicesService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PosServicesService } from './pos-services.service';

describe('PosServicesService', () => {
  let service: PosServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

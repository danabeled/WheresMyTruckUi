import { TestBed, inject } from '@angular/core/testing';

import { ActiveTruckService } from './active-truck.service';

describe('ActiveTruckService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActiveTruckService]
    });
  });

  it('should be created', inject([ActiveTruckService], (service: ActiveTruckService) => {
    expect(service).toBeTruthy();
  }));
});

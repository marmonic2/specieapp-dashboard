import { TestBed } from '@angular/core/testing';

import { MonitoringAgriculturalPricesService } from './monitoring-agricultural-prices.service';

describe('MonitoringAgriculturalPricesService', () => {
  let service: MonitoringAgriculturalPricesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitoringAgriculturalPricesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

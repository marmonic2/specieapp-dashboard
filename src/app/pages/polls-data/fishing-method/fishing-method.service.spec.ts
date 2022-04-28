import { TestBed } from '@angular/core/testing';

import { FishingMethodService } from './fishing-method.service';

describe('FishingMethodService', () => {
  let service: FishingMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FishingMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

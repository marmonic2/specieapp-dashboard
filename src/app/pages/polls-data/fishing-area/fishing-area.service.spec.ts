import { TestBed } from '@angular/core/testing';

import { FishingAreaService } from './fishing-area.service';

describe('FishingAreaService', () => {
  let service: FishingAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FishingAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

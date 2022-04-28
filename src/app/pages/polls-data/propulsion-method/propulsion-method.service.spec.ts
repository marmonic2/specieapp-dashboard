import { TestBed } from '@angular/core/testing';

import { PropulsionMethodService } from './propulsion-method.service';

describe('PropulsionMethodService', () => {
  let service: PropulsionMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropulsionMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

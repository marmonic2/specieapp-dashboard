import { TestBed } from '@angular/core/testing';

import { RgpSaiService } from './rgp-sai.service';

describe('RgpSaiService', () => {
  let service: RgpSaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RgpSaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

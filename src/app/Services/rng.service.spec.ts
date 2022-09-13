import { TestBed } from '@angular/core/testing';

import { RngService } from './rng.service';

describe('RngService', () => {
  let service: RngService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

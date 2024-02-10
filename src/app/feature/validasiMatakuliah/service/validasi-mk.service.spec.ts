import { TestBed } from '@angular/core/testing';

import { ValidasiMkService } from './validasi-mk.service';

describe('ValidasiMkService', () => {
  let service: ValidasiMkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidasiMkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

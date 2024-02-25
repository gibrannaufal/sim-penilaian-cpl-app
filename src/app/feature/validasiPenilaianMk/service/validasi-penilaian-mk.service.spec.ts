import { TestBed } from '@angular/core/testing';

import { ValidasiPenilaianMkService } from './validasi-penilaian-mk.service';

describe('ValidasiPenilaianMkService', () => {
  let service: ValidasiPenilaianMkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidasiPenilaianMkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

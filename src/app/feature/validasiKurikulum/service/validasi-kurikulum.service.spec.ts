import { TestBed } from '@angular/core/testing';

import { ValidasiKurikulumService } from './validasi-kurikulum.service';

describe('ValidasiKurikulumService', () => {
  let service: ValidasiKurikulumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidasiKurikulumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { EvaluasiCplService } from './evaluasi-cpl.service';

describe('EvaluasiCplService', () => {
  let service: EvaluasiCplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluasiCplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

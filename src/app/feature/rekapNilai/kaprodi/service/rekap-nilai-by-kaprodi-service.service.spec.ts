import { TestBed } from '@angular/core/testing';

import { RekapNilaiByKaprodiServiceService } from './rekap-nilai-by-kaprodi-service.service';

describe('RekapNilaiByKaprodiServiceService', () => {
  let service: RekapNilaiByKaprodiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RekapNilaiByKaprodiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

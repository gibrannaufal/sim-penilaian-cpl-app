import { TestBed } from '@angular/core/testing';

import { RekapNilaiMahasiswaService } from './rekap-nilai-mahasiswa.service';

describe('RekapNilaiMahasiswaService', () => {
  let service: RekapNilaiMahasiswaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RekapNilaiMahasiswaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

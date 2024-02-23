import { TestBed } from '@angular/core/testing';

import { PenilaianMkService } from './penilaian-mk.service';

describe('PenilaianMkService', () => {
  let service: PenilaianMkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PenilaianMkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

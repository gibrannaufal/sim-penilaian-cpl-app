import { TestBed } from '@angular/core/testing';

import { CpmkService } from './cpmk.service';

describe('CpmkService', () => {
  let service: CpmkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpmkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

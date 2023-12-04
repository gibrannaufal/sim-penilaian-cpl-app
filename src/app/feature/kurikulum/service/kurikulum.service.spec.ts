import { TestBed } from '@angular/core/testing';

import { KurikulumService } from './kurikulum.service';

describe('KurikulumService', () => {
  let service: KurikulumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KurikulumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

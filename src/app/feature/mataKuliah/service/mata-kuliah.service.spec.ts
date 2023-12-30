import { TestBed } from '@angular/core/testing';

import { MataKuliahService } from './mata-kuliah.service';

describe('MataKuliahService', () => {
  let service: MataKuliahService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MataKuliahService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

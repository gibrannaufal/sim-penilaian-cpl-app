import { TestBed } from '@angular/core/testing';

import { SubCpmkService } from './sub-cpmk.service';

describe('SubCpmkService', () => {
  let service: SubCpmkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubCpmkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

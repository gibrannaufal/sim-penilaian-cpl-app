import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidasiPenilaianMkComponent } from './validasi-penilaian-mk.component';

describe('ValidasiPenilaianMkComponent', () => {
  let component: ValidasiPenilaianMkComponent;
  let fixture: ComponentFixture<ValidasiPenilaianMkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidasiPenilaianMkComponent]
    });
    fixture = TestBed.createComponent(ValidasiPenilaianMkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

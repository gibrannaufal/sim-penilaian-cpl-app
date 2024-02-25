import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDitolakValidasiPenilaianComponent } from './form-ditolak-validasi-penilaian.component';

describe('FormDitolakValidasiPenilaianComponent', () => {
  let component: FormDitolakValidasiPenilaianComponent;
  let fixture: ComponentFixture<FormDitolakValidasiPenilaianComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDitolakValidasiPenilaianComponent]
    });
    fixture = TestBed.createComponent(FormDitolakValidasiPenilaianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

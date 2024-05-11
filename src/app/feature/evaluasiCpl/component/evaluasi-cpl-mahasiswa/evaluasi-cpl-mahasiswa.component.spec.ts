import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluasiCplMahasiswaComponent } from './evaluasi-cpl-mahasiswa.component';

describe('EvaluasiCplMahasiswaComponent', () => {
  let component: EvaluasiCplMahasiswaComponent;
  let fixture: ComponentFixture<EvaluasiCplMahasiswaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluasiCplMahasiswaComponent]
    });
    fixture = TestBed.createComponent(EvaluasiCplMahasiswaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RekapNilaiMahasiswaComponent } from './rekap-nilai-mahasiswa.component';

describe('RekapNilaiMahasiswaComponent', () => {
  let component: RekapNilaiMahasiswaComponent;
  let fixture: ComponentFixture<RekapNilaiMahasiswaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RekapNilaiMahasiswaComponent]
    });
    fixture = TestBed.createComponent(RekapNilaiMahasiswaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

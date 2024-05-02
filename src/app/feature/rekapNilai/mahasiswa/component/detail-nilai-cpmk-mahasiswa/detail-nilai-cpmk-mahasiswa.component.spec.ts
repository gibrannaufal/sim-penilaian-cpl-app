import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailNilaiCpmkMahasiswaComponent } from './detail-nilai-cpmk-mahasiswa.component';

describe('DetailNilaiCpmkMahasiswaComponent', () => {
  let component: DetailNilaiCpmkMahasiswaComponent;
  let fixture: ComponentFixture<DetailNilaiCpmkMahasiswaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailNilaiCpmkMahasiswaComponent]
    });
    fixture = TestBed.createComponent(DetailNilaiCpmkMahasiswaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

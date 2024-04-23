import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNilaiCpmkMahasiswaComponent } from './list-nilai-cpmk-mahasiswa.component';

describe('ListNilaiCpmkMahasiswaComponent', () => {
  let component: ListNilaiCpmkMahasiswaComponent;
  let fixture: ComponentFixture<ListNilaiCpmkMahasiswaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListNilaiCpmkMahasiswaComponent]
    });
    fixture = TestBed.createComponent(ListNilaiCpmkMahasiswaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

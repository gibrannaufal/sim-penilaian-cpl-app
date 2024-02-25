import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNilaiMahasiswaComponent } from './list-nilai-mahasiswa.component';

describe('ListNilaiMahasiswaComponent', () => {
  let component: ListNilaiMahasiswaComponent;
  let fixture: ComponentFixture<ListNilaiMahasiswaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListNilaiMahasiswaComponent]
    });
    fixture = TestBed.createComponent(ListNilaiMahasiswaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidasiKurikulumComponent } from './validasi-kurikulum.component';

describe('ValidasiKurikulumComponent', () => {
  let component: ValidasiKurikulumComponent;
  let fixture: ComponentFixture<ValidasiKurikulumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidasiKurikulumComponent]
    });
    fixture = TestBed.createComponent(ValidasiKurikulumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormValidasiKurikulumComponent } from './form-validasi-kurikulum.component';

describe('FormValidasiKurikulumComponent', () => {
  let component: FormValidasiKurikulumComponent;
  let fixture: ComponentFixture<FormValidasiKurikulumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormValidasiKurikulumComponent]
    });
    fixture = TestBed.createComponent(FormValidasiKurikulumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormValidasiMkComponent } from './form-validasi-mk.component';

describe('FormValidasiMkComponent', () => {
  let component: FormValidasiMkComponent;
  let fixture: ComponentFixture<FormValidasiMkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormValidasiMkComponent]
    });
    fixture = TestBed.createComponent(FormValidasiMkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

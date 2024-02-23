import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPenilaianComponent } from './form-penilaian.component';

describe('FormPenilaianComponent', () => {
  let component: FormPenilaianComponent;
  let fixture: ComponentFixture<FormPenilaianComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormPenilaianComponent]
    });
    fixture = TestBed.createComponent(FormPenilaianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

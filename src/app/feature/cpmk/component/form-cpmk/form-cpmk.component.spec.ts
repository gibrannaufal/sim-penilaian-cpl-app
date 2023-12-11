import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCpmkComponent } from './form-cpmk.component';

describe('FormCpmkComponent', () => {
  let component: FormCpmkComponent;
  let fixture: ComponentFixture<FormCpmkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCpmkComponent]
    });
    fixture = TestBed.createComponent(FormCpmkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

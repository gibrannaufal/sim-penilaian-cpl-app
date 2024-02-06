import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubCpmkComponent } from './form-sub-cpmk.component';

describe('FormSubCpmkComponent', () => {
  let component: FormSubCpmkComponent;
  let fixture: ComponentFixture<FormSubCpmkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormSubCpmkComponent]
    });
    fixture = TestBed.createComponent(FormSubCpmkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

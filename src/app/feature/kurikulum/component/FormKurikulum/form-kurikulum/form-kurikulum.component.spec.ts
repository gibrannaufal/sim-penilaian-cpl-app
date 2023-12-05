import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormKurikulumComponent } from './form-kurikulum.component';

describe('FormKurikulumComponent', () => {
  let component: FormKurikulumComponent;
  let fixture: ComponentFixture<FormKurikulumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormKurikulumComponent]
    });
    fixture = TestBed.createComponent(FormKurikulumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMataKuliahComponent } from './form-mata-kuliah.component';

describe('FormMataKuliahComponent', () => {
  let component: FormMataKuliahComponent;
  let fixture: ComponentFixture<FormMataKuliahComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormMataKuliahComponent]
    });
    fixture = TestBed.createComponent(FormMataKuliahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

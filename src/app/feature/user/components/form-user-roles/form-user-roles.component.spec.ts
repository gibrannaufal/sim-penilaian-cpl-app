import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserRolesComponent } from './form-user-roles.component';

describe('FormUserRolesComponent', () => {
  let component: FormUserRolesComponent;
  let fixture: ComponentFixture<FormUserRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormUserRolesComponent]
    });
    fixture = TestBed.createComponent(FormUserRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

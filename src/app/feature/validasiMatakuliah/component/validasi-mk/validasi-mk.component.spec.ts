import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidasiMkComponent } from './validasi-mk.component';

describe('ValidasiMkComponent', () => {
  let component: ValidasiMkComponent;
  let fixture: ComponentFixture<ValidasiMkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidasiMkComponent]
    });
    fixture = TestBed.createComponent(ValidasiMkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

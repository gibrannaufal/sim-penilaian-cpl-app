import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluasiCplComponent } from './evaluasi-cpl.component';

describe('EvaluasiCplComponent', () => {
  let component: EvaluasiCplComponent;
  let fixture: ComponentFixture<EvaluasiCplComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluasiCplComponent]
    });
    fixture = TestBed.createComponent(EvaluasiCplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

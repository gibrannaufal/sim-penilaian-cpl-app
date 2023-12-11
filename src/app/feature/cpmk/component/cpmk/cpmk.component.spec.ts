import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpmkComponent } from './cpmk.component';

describe('CpmkComponent', () => {
  let component: CpmkComponent;
  let fixture: ComponentFixture<CpmkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CpmkComponent]
    });
    fixture = TestBed.createComponent(CpmkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

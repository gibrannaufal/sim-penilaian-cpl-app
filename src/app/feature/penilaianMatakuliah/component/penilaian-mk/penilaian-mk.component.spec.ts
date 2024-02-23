import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenilaianMkComponent } from './penilaian-mk.component';

describe('PenilaianMkComponent', () => {
  let component: PenilaianMkComponent;
  let fixture: ComponentFixture<PenilaianMkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PenilaianMkComponent]
    });
    fixture = TestBed.createComponent(PenilaianMkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

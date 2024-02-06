import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCpmkComponent } from './sub-cpmk.component';

describe('SubCpmkComponent', () => {
  let component: SubCpmkComponent;
  let fixture: ComponentFixture<SubCpmkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubCpmkComponent]
    });
    fixture = TestBed.createComponent(SubCpmkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

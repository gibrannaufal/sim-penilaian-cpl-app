import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubCpmkComponent } from './list-sub-cpmk.component';

describe('ListSubCpmkComponent', () => {
  let component: ListSubCpmkComponent;
  let fixture: ComponentFixture<ListSubCpmkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSubCpmkComponent]
    });
    fixture = TestBed.createComponent(ListSubCpmkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

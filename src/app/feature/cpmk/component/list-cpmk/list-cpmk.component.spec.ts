import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCpmkComponent } from './list-cpmk.component';

describe('ListCpmkComponent', () => {
  let component: ListCpmkComponent;
  let fixture: ComponentFixture<ListCpmkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCpmkComponent]
    });
    fixture = TestBed.createComponent(ListCpmkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

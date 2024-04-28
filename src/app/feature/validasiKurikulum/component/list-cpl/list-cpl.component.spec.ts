import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCplComponent } from './list-cpl.component';

describe('ListCplComponent', () => {
  let component: ListCplComponent;
  let fixture: ComponentFixture<ListCplComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCplComponent]
    });
    fixture = TestBed.createComponent(ListCplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

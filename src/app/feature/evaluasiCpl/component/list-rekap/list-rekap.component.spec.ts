import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRekapComponent } from './list-rekap.component';

describe('ListRekapComponent', () => {
  let component: ListRekapComponent;
  let fixture: ComponentFixture<ListRekapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRekapComponent]
    });
    fixture = TestBed.createComponent(ListRekapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

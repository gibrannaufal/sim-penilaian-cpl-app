import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetailMkComponent } from './list-detail-mk.component';

describe('ListDetailMkComponent', () => {
  let component: ListDetailMkComponent;
  let fixture: ComponentFixture<ListDetailMkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDetailMkComponent]
    });
    fixture = TestBed.createComponent(ListDetailMkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

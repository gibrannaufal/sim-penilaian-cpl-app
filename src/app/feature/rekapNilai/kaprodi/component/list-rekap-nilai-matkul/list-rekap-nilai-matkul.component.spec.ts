import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRekapNilaiMatkulComponent } from './list-rekap-nilai-matkul.component';

describe('ListRekapNilaiMatkulComponent', () => {
  let component: ListRekapNilaiMatkulComponent;
  let fixture: ComponentFixture<ListRekapNilaiMatkulComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRekapNilaiMatkulComponent]
    });
    fixture = TestBed.createComponent(ListRekapNilaiMatkulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

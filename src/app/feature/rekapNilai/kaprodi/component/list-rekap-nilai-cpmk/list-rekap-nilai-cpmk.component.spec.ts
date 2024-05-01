import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRekapNilaiCpmkComponent } from './list-rekap-nilai-cpmk.component';

describe('ListRekapNilaiCpmkComponent', () => {
  let component: ListRekapNilaiCpmkComponent;
  let fixture: ComponentFixture<ListRekapNilaiCpmkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRekapNilaiCpmkComponent]
    });
    fixture = TestBed.createComponent(ListRekapNilaiCpmkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

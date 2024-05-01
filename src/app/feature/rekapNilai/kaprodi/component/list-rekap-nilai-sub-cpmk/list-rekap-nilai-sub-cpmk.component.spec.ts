import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRekapNilaiSubCpmkComponent } from './list-rekap-nilai-sub-cpmk.component';

describe('ListRekapNilaiSubCpmkComponent', () => {
  let component: ListRekapNilaiSubCpmkComponent;
  let fixture: ComponentFixture<ListRekapNilaiSubCpmkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRekapNilaiSubCpmkComponent]
    });
    fixture = TestBed.createComponent(ListRekapNilaiSubCpmkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNilaiSubCpmkComponent } from './list-nilai-sub-cpmk.component';

describe('ListNilaiSubCpmkComponent', () => {
  let component: ListNilaiSubCpmkComponent;
  let fixture: ComponentFixture<ListNilaiSubCpmkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListNilaiSubCpmkComponent]
    });
    fixture = TestBed.createComponent(ListNilaiSubCpmkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

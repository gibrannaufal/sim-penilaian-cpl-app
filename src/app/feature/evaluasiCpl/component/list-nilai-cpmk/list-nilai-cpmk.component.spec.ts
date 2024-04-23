import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNilaiCpmkComponent } from './list-nilai-cpmk.component';

describe('ListNilaiCpmkComponent', () => {
  let component: ListNilaiCpmkComponent;
  let fixture: ComponentFixture<ListNilaiCpmkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListNilaiCpmkComponent]
    });
    fixture = TestBed.createComponent(ListNilaiCpmkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

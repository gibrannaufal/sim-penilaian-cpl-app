import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubCpmkValPenilaianComponent } from './list-sub-cpmk-val-penilaian.component';

describe('ListSubCpmkValPenilaianComponent', () => {
  let component: ListSubCpmkValPenilaianComponent;
  let fixture: ComponentFixture<ListSubCpmkValPenilaianComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSubCpmkValPenilaianComponent]
    });
    fixture = TestBed.createComponent(ListSubCpmkValPenilaianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

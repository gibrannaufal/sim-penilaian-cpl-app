import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCpmkValPenilaianComponent } from './list-cpmk-val-penilaian.component';

describe('ListCpmkValPenilaianComponent', () => {
  let component: ListCpmkValPenilaianComponent;
  let fixture: ComponentFixture<ListCpmkValPenilaianComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCpmkValPenilaianComponent]
    });
    fixture = TestBed.createComponent(ListCpmkValPenilaianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

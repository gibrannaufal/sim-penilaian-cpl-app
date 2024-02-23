import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPenilaianSubCpmkComponent } from './list-penilaian-sub-cpmk.component';

describe('ListPenilaianSubCpmkComponent', () => {
  let component: ListPenilaianSubCpmkComponent;
  let fixture: ComponentFixture<ListPenilaianSubCpmkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPenilaianSubCpmkComponent]
    });
    fixture = TestBed.createComponent(ListPenilaianSubCpmkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

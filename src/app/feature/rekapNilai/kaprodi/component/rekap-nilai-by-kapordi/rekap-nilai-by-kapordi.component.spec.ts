import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RekapNilaiByKapordiComponent } from './rekap-nilai-by-kapordi.component';

describe('RekapNilaiByKapordiComponent', () => {
  let component: RekapNilaiByKapordiComponent;
  let fixture: ComponentFixture<RekapNilaiByKapordiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RekapNilaiByKapordiComponent]
    });
    fixture = TestBed.createComponent(RekapNilaiByKapordiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

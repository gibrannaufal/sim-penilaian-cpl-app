import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MataKuliahComponent } from './mata-kuliah.component';

describe('MataKuliahComponent', () => {
  let component: MataKuliahComponent;
  let fixture: ComponentFixture<MataKuliahComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MataKuliahComponent]
    });
    fixture = TestBed.createComponent(MataKuliahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

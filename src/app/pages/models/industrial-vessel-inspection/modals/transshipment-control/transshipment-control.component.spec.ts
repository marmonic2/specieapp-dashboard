import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransshipmentControlComponent } from './transshipment-control.component';

describe('TransshipmentControlComponent', () => {
  let component: TransshipmentControlComponent;
  let fixture: ComponentFixture<TransshipmentControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransshipmentControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransshipmentControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

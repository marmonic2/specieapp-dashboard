/* eslint-disable no-undef */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightCheckComponent } from './weight-check.component';

describe('WeightCheckComponent', () => {
  let component: WeightCheckComponent;
  let fixture: ComponentFixture<WeightCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeightCheckComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

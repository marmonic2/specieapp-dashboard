import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringAgriculturalPricesComponent } from './monitoring-agricultural-prices.component';

describe('MonitoringAgriculturalPricesComponent', () => {
  let component: MonitoringAgriculturalPricesComponent;
  let fixture: ComponentFixture<MonitoringAgriculturalPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringAgriculturalPricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringAgriculturalPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

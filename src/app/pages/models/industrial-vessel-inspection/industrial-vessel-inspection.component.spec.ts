import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrialVesselInspectionComponent } from './industrial-vessel-inspection.component';

describe('IndustrialVesselInspectionComponent', () => {
  let component: IndustrialVesselInspectionComponent;
  let fixture: ComponentFixture<IndustrialVesselInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustrialVesselInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustrialVesselInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

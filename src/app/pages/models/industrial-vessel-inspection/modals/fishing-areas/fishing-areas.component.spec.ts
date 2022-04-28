import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishingAreasComponent } from './fishing-areas.component';

describe('FishingAreasComponent', () => {
  let component: FishingAreasComponent;
  let fixture: ComponentFixture<FishingAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FishingAreasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FishingAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

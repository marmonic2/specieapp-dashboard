import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishingAreaComponent } from './fishing-area.component';

describe('FishingAreaComponent', () => {
  let component: FishingAreaComponent;
  let fixture: ComponentFixture<FishingAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FishingAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FishingAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

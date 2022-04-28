import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishingMethodComponent } from './fishing-method.component';

describe('FishingMethodComponent', () => {
  let component: FishingMethodComponent;
  let fixture: ComponentFixture<FishingMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FishingMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FishingMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

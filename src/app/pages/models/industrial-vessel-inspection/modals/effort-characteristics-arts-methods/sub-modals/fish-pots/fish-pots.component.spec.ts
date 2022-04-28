import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishPotsComponent } from './fish-pots.component';

describe('FishPotsComponent', () => {
  let component: FishPotsComponent;
  let fixture: ComponentFixture<FishPotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FishPotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FishPotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

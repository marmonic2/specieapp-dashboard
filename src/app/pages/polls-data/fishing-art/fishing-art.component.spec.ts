import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishingArtComponent } from './fishing-art.component';

describe('FishingArtComponent', () => {
  let component: FishingArtComponent;
  let fixture: ComponentFixture<FishingArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FishingArtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FishingArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

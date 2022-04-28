import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishingSiteComponent } from './fishing-site.component';

describe('FishingSiteComponent', () => {
  let component: FishingSiteComponent;
  let fixture: ComponentFixture<FishingSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FishingSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FishingSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

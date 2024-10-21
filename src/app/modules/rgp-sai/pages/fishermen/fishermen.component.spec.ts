import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishermenComponent } from './fishermen.component';

describe('FishermenComponent', () => {
  let component: FishermenComponent;
  let fixture: ComponentFixture<FishermenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FishermenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FishermenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

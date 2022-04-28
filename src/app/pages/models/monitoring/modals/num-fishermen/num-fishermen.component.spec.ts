import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumFishermenComponent } from './num-fishermen.component';

describe('NumFishermenComponent', () => {
  let component: NumFishermenComponent;
  let fixture: ComponentFixture<NumFishermenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumFishermenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumFishermenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

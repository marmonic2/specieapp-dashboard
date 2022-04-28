import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriculturalProducerComponent } from './agricultural-producer.component';

describe('AgriculturalProducerComponent', () => {
  let component: AgriculturalProducerComponent;
  let fixture: ComponentFixture<AgriculturalProducerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgriculturalProducerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgriculturalProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

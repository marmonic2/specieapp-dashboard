import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropulsionMethodComponent } from './propulsion-method.component';

describe('PropulsionMethodComponent', () => {
  let component: PropulsionMethodComponent;
  let fixture: ComponentFixture<PropulsionMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropulsionMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropulsionMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlSampleLobsterComponent } from './control-sample-lobster.component';

describe('ControlSampleLobsterComponent', () => {
  let component: ControlSampleLobsterComponent;
  let fixture: ComponentFixture<ControlSampleLobsterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlSampleLobsterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlSampleLobsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

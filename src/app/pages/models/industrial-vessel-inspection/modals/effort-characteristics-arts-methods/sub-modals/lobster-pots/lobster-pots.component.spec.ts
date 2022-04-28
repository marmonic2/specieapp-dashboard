import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobsterPotsComponent } from './lobster-pots.component';

describe('LobsterPotsComponent', () => {
  let component: LobsterPotsComponent;
  let fixture: ComponentFixture<LobsterPotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LobsterPotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LobsterPotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

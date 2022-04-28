import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomesModalComponent } from './incomes-modal.component';

describe('IncomesModalComponent', () => {
  let component: IncomesModalComponent;
  let fixture: ComponentFixture<IncomesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

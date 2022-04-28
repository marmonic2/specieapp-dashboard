import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeDifferentModalComponent } from './income-different-modal.component';

describe('IncomeDifferentModalComponent', () => {
  let component: IncomeDifferentModalComponent;
  let fixture: ComponentFixture<IncomeDifferentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeDifferentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeDifferentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

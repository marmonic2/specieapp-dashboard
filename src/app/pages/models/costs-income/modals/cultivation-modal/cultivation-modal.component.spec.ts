import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultivationModalComponent } from './cultivation-modal.component';

describe('CultivationModalComponent', () => {
  let component: CultivationModalComponent;
  let fixture: ComponentFixture<CultivationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CultivationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CultivationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

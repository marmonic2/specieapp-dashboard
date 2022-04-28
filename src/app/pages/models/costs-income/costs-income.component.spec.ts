import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostsIncomeComponent } from './costs-income.component';

describe('CostsIncomeComponent', () => {
  let component: CostsIncomeComponent;
  let fixture: ComponentFixture<CostsIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostsIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostsIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

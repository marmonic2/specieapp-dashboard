import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductiveUnitComponent } from './productive-unit.component';

describe('ProductiveUnitComponent', () => {
  let component: ProductiveUnitComponent;
  let fixture: ComponentFixture<ProductiveUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductiveUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductiveUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSalesModalComponent } from './product-sales-modal.component';

describe('ProductSalesModalComponent', () => {
  let component: ProductSalesModalComponent;
  let fixture: ComponentFixture<ProductSalesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSalesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSalesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

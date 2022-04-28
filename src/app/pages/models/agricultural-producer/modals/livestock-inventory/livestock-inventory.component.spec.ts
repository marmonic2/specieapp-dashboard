import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivestockInventoryComponent } from './livestock-inventory.component';

describe('LivestockInventoryComponent', () => {
  let component: LivestockInventoryComponent;
  let fixture: ComponentFixture<LivestockInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivestockInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivestockInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

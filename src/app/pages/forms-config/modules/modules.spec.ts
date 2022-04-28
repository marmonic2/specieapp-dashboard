/* eslint-disable no-undef */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulesComponent } from './Modules.component';

describe('FishingFormsComponent', () => {
  let component: ModulesComponent;
  let fixture: ComponentFixture<ModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModulesComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

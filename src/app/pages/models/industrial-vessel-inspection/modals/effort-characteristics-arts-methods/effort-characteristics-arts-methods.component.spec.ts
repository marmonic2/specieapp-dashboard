import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffortCharacteristicsArtsMethodsComponent } from './effort-characteristics-arts-methods.component';

describe('EffortCharacteristicsArtsMethodsComponent', () => {
  let component: EffortCharacteristicsArtsMethodsComponent;
  let fixture: ComponentFixture<EffortCharacteristicsArtsMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EffortCharacteristicsArtsMethodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EffortCharacteristicsArtsMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BusinessRiskComponent} from './business-risk.component';

describe('BusinessRiskComponent', () => {
  let component: BusinessRiskComponent;
  let fixture: ComponentFixture<BusinessRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessRiskComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

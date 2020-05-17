import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IntellectualComponent} from './intellectual.component';

describe('IntellectualComponent', () => {
  let component: IntellectualComponent;
  let fixture: ComponentFixture<IntellectualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IntellectualComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntellectualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

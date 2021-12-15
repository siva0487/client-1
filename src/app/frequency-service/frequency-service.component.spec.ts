import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyServiceComponent } from './frequency-service.component';

describe('FrequencyServiceComponent', () => {
  let component: FrequencyServiceComponent;
  let fixture: ComponentFixture<FrequencyServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrequencyServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequencyServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

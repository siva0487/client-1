import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFrequencyServiceComponent } from './view-frequency-service.component';

describe('ViewFrequencyServiceComponent', () => {
  let component: ViewFrequencyServiceComponent;
  let fixture: ComponentFixture<ViewFrequencyServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFrequencyServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFrequencyServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

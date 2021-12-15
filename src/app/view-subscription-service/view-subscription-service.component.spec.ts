import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubscriptionServiceComponent } from './view-subscription-service.component';

describe('ViewSubscriptionServiceComponent', () => {
  let component: ViewSubscriptionServiceComponent;
  let fixture: ComponentFixture<ViewSubscriptionServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSubscriptionServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubscriptionServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

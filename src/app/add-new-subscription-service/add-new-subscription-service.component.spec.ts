import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSubscriptionServiceComponent } from './add-new-subscription-service.component';

describe('AddNewSubscriptionServiceComponent', () => {
  let component: AddNewSubscriptionServiceComponent;
  let fixture: ComponentFixture<AddNewSubscriptionServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewSubscriptionServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewSubscriptionServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

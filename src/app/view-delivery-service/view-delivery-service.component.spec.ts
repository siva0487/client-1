import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeliveryServiceComponent } from './view-delivery-service.component';

describe('ViewDeliveryServiceComponent', () => {
  let component: ViewDeliveryServiceComponent;
  let fixture: ComponentFixture<ViewDeliveryServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDeliveryServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDeliveryServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

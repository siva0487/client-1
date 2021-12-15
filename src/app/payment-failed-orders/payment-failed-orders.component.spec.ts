import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFailedOrdersComponent } from './payment-failed-orders.component';

describe('PaymentFailedOrdersComponent', () => {
  let component: PaymentFailedOrdersComponent;
  let fixture: ComponentFixture<PaymentFailedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentFailedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFailedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

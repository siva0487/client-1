import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOptionServiceComponent } from './delivery-option-service.component';

describe('DeliveryOptionServiceComponent', () => {
  let component: DeliveryOptionServiceComponent;
  let fixture: ComponentFixture<DeliveryOptionServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryOptionServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryOptionServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

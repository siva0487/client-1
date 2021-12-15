import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewCouponComponent } from './create-new-coupon.component';

describe('CreateNewCouponComponent', () => {
  let component: CreateNewCouponComponent;
  let fixture: ComponentFixture<CreateNewCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewCouponComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

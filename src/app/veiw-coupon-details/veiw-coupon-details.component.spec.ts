import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwCouponDetailsComponent } from './veiw-coupon-details.component';

describe('VeiwCouponDetailsComponent', () => {
  let component: VeiwCouponDetailsComponent;
  let fixture: ComponentFixture<VeiwCouponDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiwCouponDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiwCouponDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

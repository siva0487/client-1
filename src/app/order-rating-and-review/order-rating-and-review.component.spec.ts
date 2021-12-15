import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRatingAndReviewComponent } from './order-rating-and-review.component';

describe('OrderRatingAndReviewComponent', () => {
  let component: OrderRatingAndReviewComponent;
  let fixture: ComponentFixture<OrderRatingAndReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderRatingAndReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderRatingAndReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

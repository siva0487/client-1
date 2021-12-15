import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingReviewViewDetailsComponent } from './rating-review-view-details.component';

describe('RatingReviewViewDetailsComponent', () => {
  let component: RatingReviewViewDetailsComponent;
  let fixture: ComponentFixture<RatingReviewViewDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingReviewViewDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingReviewViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

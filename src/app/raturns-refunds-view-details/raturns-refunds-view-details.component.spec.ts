import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaturnsRefundsViewDetailsComponent } from './raturns-refunds-view-details.component';

describe('RaturnsRefundsViewDetailsComponent', () => {
  let component: RaturnsRefundsViewDetailsComponent;
  let fixture: ComponentFixture<RaturnsRefundsViewDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaturnsRefundsViewDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaturnsRefundsViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnsAndRefundsComponent } from './returns-and-refunds.component';

describe('ReturnsAndRefundsComponent', () => {
  let component: ReturnsAndRefundsComponent;
  let fixture: ComponentFixture<ReturnsAndRefundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnsAndRefundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnsAndRefundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

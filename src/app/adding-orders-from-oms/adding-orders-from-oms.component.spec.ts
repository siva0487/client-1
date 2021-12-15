import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingOrdersFromOMSComponent } from './adding-orders-from-oms.component';

describe('AddingOrdersFromOMSComponent', () => {
  let component: AddingOrdersFromOMSComponent;
  let fixture: ComponentFixture<AddingOrdersFromOMSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddingOrdersFromOMSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingOrdersFromOMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewProductForThisOrderComponent } from './add-new-product-for-this-order.component';

describe('AddNewProductForThisOrderComponent', () => {
  let component: AddNewProductForThisOrderComponent;
  let fixture: ComponentFixture<AddNewProductForThisOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewProductForThisOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewProductForThisOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

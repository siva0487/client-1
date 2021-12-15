import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewDeliveryServiceComponent } from './add-new-delivery-service.component';

describe('AddNewDeliveryServiceComponent', () => {
  let component: AddNewDeliveryServiceComponent;
  let fixture: ComponentFixture<AddNewDeliveryServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewDeliveryServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewDeliveryServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

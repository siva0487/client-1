import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewFrequencyServiceComponent } from './add-new-frequency-service.component';

describe('AddNewFrequencyServiceComponent', () => {
  let component: AddNewFrequencyServiceComponent;
  let fixture: ComponentFixture<AddNewFrequencyServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewFrequencyServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewFrequencyServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

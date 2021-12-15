import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewSlotsComponent } from './create-new-slots.component';

describe('CreateNewSlotsComponent', () => {
  let component: CreateNewSlotsComponent;
  let fixture: ComponentFixture<CreateNewSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewSlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

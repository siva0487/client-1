import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfSlotsComponent } from './list-of-slots.component';

describe('ListOfSlotsComponent', () => {
  let component: ListOfSlotsComponent;
  let fixture: ComponentFixture<ListOfSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfSlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

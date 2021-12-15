import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreViewDetailsComponent } from './store-view-details.component';

describe('StoreViewDetailsComponent', () => {
  let component: StoreViewDetailsComponent;
  let fixture: ComponentFixture<StoreViewDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreViewDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

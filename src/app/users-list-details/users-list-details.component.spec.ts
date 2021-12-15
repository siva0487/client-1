import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListDetailsComponent } from './users-list-details.component';

describe('UsersListDetailsComponent', () => {
  let component: UsersListDetailsComponent;
  let fixture: ComponentFixture<UsersListDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersListDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRolesListComponent } from './view-roles-list.component';

describe('ViewRolesListComponent', () => {
  let component: ViewRolesListComponent;
  let fixture: ComponentFixture<ViewRolesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRolesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRolesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

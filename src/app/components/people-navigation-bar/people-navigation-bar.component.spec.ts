import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleNavigationBarComponent } from './people-navigation-bar.component';

describe('PeopleNavigationBarComponent', () => {
  let component: PeopleNavigationBarComponent;
  let fixture: ComponentFixture<PeopleNavigationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleNavigationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

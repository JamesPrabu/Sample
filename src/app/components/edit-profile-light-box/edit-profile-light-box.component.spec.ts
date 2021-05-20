import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileLightBoxComponent } from './edit-profile-light-box.component';

describe('EditProfileLightBoxComponent', () => {
  let component: EditProfileLightBoxComponent;
  let fixture: ComponentFixture<EditProfileLightBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileLightBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileLightBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

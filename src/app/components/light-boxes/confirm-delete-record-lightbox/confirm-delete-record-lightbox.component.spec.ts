import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteRecordLightboxComponent } from './confirm-delete-record-lightbox.component';

describe('ConfirmDeleteRecordLightboxComponent', () => {
  let component: ConfirmDeleteRecordLightboxComponent;
  let fixture: ComponentFixture<ConfirmDeleteRecordLightboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteRecordLightboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteRecordLightboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

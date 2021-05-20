import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  public formGroup: FormGroup;
  constructor(public fb: FormBuilder) { }

  public buildPeopleFormGroup() {
    this.formGroup = this.fb.group({
        lastName: '',
        firstName: '',
        emailAddress: '',
        phoneNumber: '',
        dietaryRestrictions: '',
        dob: '',
        gender: '',
        religiousAffiliation: ''
      });
  }

  public popuplate(data) {
    this.formGroup.get('lastName').setValue(data.lastName);
  }
}

import { FormControl, ValidationErrors, Validators } from '@angular/forms';
import validator from 'validator';

export class CustomValidators extends Validators {
    static validateEmail(control: FormControl): ValidationErrors {
      if (control.value && !validator.isEmail(control.value)) {
        return  {invalidEmail:  true};
      } else {
        return null;
      }
    }
  }
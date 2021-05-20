import { AbstractControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FormGroupKeyService } from '../form-group-keys/form-group-key.service';

export class FormValidators extends Validators {

    public static alphaNumericValidator = Validators.pattern(/[A-Z0-9]+/i);
    public static numericValidator = Validators.pattern('^[0-9]+$');
    public static emailFormatValidator = Validators.pattern('^[a-zA-Z0-9](?:[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]{0,200}[a-zA-Z0-9])@(?:[a-zA-Z0-9][a-zA-Z0-9-]{0,63}[a-zA-Z0-9][.]){1,2}[a-zA-Z]{2,63}$');
  
    public static personContactValidator(currentGroup: FormGroup): ValidationErrors | null {
      const emailControl = currentGroup.get(FormGroupKeyService.Common.EMAIL_ADDRESS);
      const phoneControl = currentGroup.get(FormGroupKeyService.Common.PHONE_NUMBER);
  
      if (FormValidators.hasValue(phoneControl) || FormValidators.hasValue(emailControl)) {
        return null;
      }
  
      return { invalid: true };
    }
  
    public static hasValue(control: AbstractControl): boolean {
      if (control) {
        if (control.value) {
          const trimmed = control.value.trim();
          return trimmed.length > 0;
        }
      }
  
      return false;
    }
}
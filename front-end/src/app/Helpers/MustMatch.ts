import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appMustMatch]',
  standalone: true,
  providers: [{provide: NG_VALIDATORS, useExisting: MustMatchDirective, multi: true}]
})
export class MustMatchDirective implements Validator {
  @Input('appMustMatch') mustMatch: string[] = [];

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.parent) {
      return null;
    }

    const password = control.parent.get(this.mustMatch[0]);
    const confirmPassword = control.parent.get(this.mustMatch[1]);

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { mustMatch: true };
    }

    return null;
  }
}

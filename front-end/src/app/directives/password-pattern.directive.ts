import {Directive, Input} from '@angular/core';
import {FormGroup, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";
import Validation from "../Helpers/MustMatch";


@Directive({
  selector: '[appMatchPassword]',
  standalone: true,
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordPatternDirective, multi: true}]
})
export class PasswordPatternDirective implements Validator {
@Input('appMatchPassword') matchPassword: string[] = [];

  validate(formGroup: FormGroup): ValidationErrors | null {
    return Validation.match(this.matchPassword[0], this.matchPassword[1])(formGroup);
  }
}

import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, ValidatorFn,
  Validators
} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {AuthService} from "../../../services/auth-service";
import {StorageService} from "../../../services/storage-service";
import {RouterLink} from "@angular/router";
import {SignupKompanijaComponent} from "../signup-kompanija/signup-kompanija.component";
import {SignupKandidatComponent} from "../signup-kandidat/signup-kandidat.component";
import {SignupKompanijaOpisComponent} from "../signup-kompanija-opis/signup-kompanija-opis.component";

@Component({
  selector: 'app-signup-general',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    FormsModule,
    RouterLink,
    SignupKompanijaComponent,
    SignupKandidatComponent,
    NgIf,
    SignupKompanijaOpisComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  form: any = {
    username: null,
    password: null,
    confirmPassword: null,
    email: null
  };

  isSignUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: string[] = [];
  username: string = '';
  role: string = "Candidate";
  next: boolean = false;
  korisnik: any = this.form;

  ismatching(){
    return this.form.password === this.form.confirmPassword;
  }

  constructor(private authService: AuthService, private storageService: StorageService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isSignUp = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

  match(controlName: string, checkControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(checkControlName);

      if (!control || !matchingControl) {
        return null;
      }

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }

      return null;
    };
  }

  chooseRole(role: string) {
    this.role = role;
  }

  openNext() {
    this.next ? this.next = false : this.next = true;
  }
}

import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, ValidatorFn,
  Validators,
} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {AuthService} from "../../../services/auth-service";
import {StorageService} from "../../../services/storage-service";
import {RouterLink} from "@angular/router";
import {SignupKompanijaComponent} from "../signup-kompanija/signup-kompanija.component";
import {SignupKandidatComponent} from "../signup-kandidat/signup-kandidat.component";
import {SignupKompanijaOpisComponent} from "../signup-kompanija-opis/signup-kompanija-opis.component";
import {PasswordPatternDirective} from "../../../directives/password-pattern.directive";


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
    SignupKompanijaOpisComponent,
    PasswordPatternDirective
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


  chooseRole(role: string) {
    this.role = role;
  }

  openNext() {
    this.next ? this.next = false : this.next = true;
  }
}

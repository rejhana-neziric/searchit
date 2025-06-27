import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {AuthService} from "../../../../services/auth-service";
import {Router, RouterLink} from "@angular/router";
import {SignupKompanijaComponent} from "../signup-kompanija/signup-kompanija.component";
import {SignupKandidatComponent} from "../signup-kandidat/signup-kandidat.component";
import {SignupKompanijaOpisComponent} from "../signup-kompanija-opis/signup-kompanija-opis.component";
import {PasswordPatternDirective} from "../../../../directives/password-pattern.directive";
import {take} from "rxjs";
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
    PasswordPatternDirective,
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

  errorMessage = '';
  username: string = '';
  role: string = "Candidate";
  next: boolean = false;
  korisnik: any = this.form;

  constructor(private authService: AuthService,
              private router: Router) {
    this.authService.user$.pipe(take(1)).subscribe({
      next: user => {
        if(user) {
          this.router.navigateByUrl('/');
        }
      }
    })
  }

  ngOnInit(): void {

  }

  chooseRole(role: string) {
    this.role = role;
  }

  openNext() {
    this.next ? this.next = false : this.next = true;
  }
}

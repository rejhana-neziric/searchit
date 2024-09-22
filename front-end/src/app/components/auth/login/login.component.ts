import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth-service";
import {FormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {take} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage: string = '';
  username: string = '';
  returnUrl: string | null = null;
  errorMessages: string[] = [];

  constructor(private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.authService.user$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          this.router.navigateByUrl('/home');

        } else {
          this.activatedRoute.queryParams.subscribe({
            next: (params: any) => {
              if (params) {
                this.returnUrl = params['returnUrl'];
              }
            }
          })
        }
      }
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const {username, password} = this.form;
    this.errorMessage = '';

    this.authService.login(username, password).subscribe({
      next: data => {
          this.isLoginFailed = false;
          this.isLoggedIn = true;

          if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.router.navigateByUrl('/home');
          }
      },
      error: error => {
        if (error.error.message == "RequiresTwoFactor") {
          // Navigate to 2FA component
          this.username = username;
          this.router.navigate(['/2fa'], {queryParams: {username: this.username }})
        }
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;

      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  resendEmailConfirmationLink() {
    this.router.navigateByUrl('/send-email/resend-email-confirmation-link');
  }
}

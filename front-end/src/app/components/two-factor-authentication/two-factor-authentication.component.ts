import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth-service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";
import {NotificationService} from "../../services/notification-service";

@Component({
  selector: 'app-two-factor-authentication',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NavbarComponent
  ],
  templateUrl: './two-factor-authentication.component.html',
  styleUrl: './two-factor-authentication.component.css'
})
export class TwoFactorAuthenticationComponent implements OnInit{
  token: string = '';
  errorMessage: string = '';
  username: string = "";

  constructor(private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const username = params['username'];
      this.username = username;
    });
  }

  // Verify the 2FA code
  verifyCode() {
    this.authService.verifyTwoFactor(this.username, this.token.toString()).subscribe({
      next: (response) => {
        // 2FA verification successful, navigate to the main app
        this.notificationService.showModalNotification(true, 'Successful verification', 'Your 2FA verification was successful. You are now securely logged in.')
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        this.errorMessage = 'Invalid 2FA code.';
      }
    });
  }
}

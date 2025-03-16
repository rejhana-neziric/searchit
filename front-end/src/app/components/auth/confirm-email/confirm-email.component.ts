import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth-service";
import {ActivatedRoute, Route, Router, RouterLink} from "@angular/router";
import {take} from "rxjs";
import {User} from "../../../modals/user";
import {ConfirmEmail} from "../../../modals/confirmEmail";
import {NotificationService} from "../../../services/notification-service";
import {NgIf} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    TranslatePipe
  ],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})
export class ConfirmEmailComponent implements OnInit{

  success = true;

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService) {
  }
  ngOnInit(): void {
    this.authService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) =>{
        if (user) {
          this.router.navigateByUrl('/');
        } else {
          this.activatedRoute.queryParams.subscribe({
            next: (params: any) => {
              const confirmEmail: ConfirmEmail = {
                token: params['token'],
                email: params['email'],
              }

              this.authService.confirmEmail(confirmEmail).subscribe({
                next: (response: any) => {
                  this.notificationService.showModalNotification(true, response.value.title, response.value.message);
                }, error: error => {
                  this.success = false;
                  this.notificationService.showModalNotification(false, "Failed", error.error.message );
                }
              })
            }
          })
        }
      }
    })
  }

  resendEmailConfirmationLink() {
    this.router.navigateByUrl('/send-email/resend-email-confirmation-link');
  }

}

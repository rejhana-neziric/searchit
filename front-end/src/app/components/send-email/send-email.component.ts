import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth-service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {take} from "rxjs";
import {User} from "../../modals/user";
import {NotificationService} from "../../services/notification-service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.css'
})
export class SendEmailComponent implements OnInit {

  emailForm: FormGroup = new FormGroup({});
  submitted = false;
  mode: string | undefined;
  errorMessages: string[] = [];

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.authService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.router.navigateByUrl('/');
        } else {
          const mode = this.activatedRoute.snapshot.params['mode'];
          if (mode) {
            this.mode = mode;
            this.initializeForm();
          }
        }
      }
    })
  }

  initializeForm() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  sendEmail() {
    this.submitted = true;
    this.errorMessages = [];

    if (this.emailForm.valid && this.mode) {
      if (this.mode.includes('resend-email-confirmation-link')) {
        this.authService.resendEmailConfirmationLink(this.emailForm.get('email')?.value).subscribe({
          next: (response: any) => {
            this.notificationService.showModalNotification(true, response.value.title, response.value.message);
            this.router.navigateByUrl('/login');
          },
          error: error => {
            if (error.error && error.error.message) {
              this.errorMessages.push(error.error.message);
            } else {
              this.errorMessages.push('An unknown error occurred.');
            }
          }
        });
      }
    }
  }

  cancel() {
    this.router.navigateByUrl('/login');
  }
}

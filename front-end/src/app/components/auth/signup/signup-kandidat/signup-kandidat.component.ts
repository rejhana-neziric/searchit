import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {AuthService} from "../../../../services/auth-service";
import {NotificationService} from "../../../../services/notification-service";

@Component({
  selector: 'app-signup-kandidat',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './signup-kandidat.component.html',
  styleUrl: './signup-kandidat.component.css'
})
export class SignupKandidatComponent implements OnInit{
  @Output() customEvent = new EventEmitter<string>();
  @Input() korisnik: any;

  form: any = {
    ime: null,
    prezime: null,
    datumRodjenja: null,
    mjestoPrebivalista: null,
    phoneNumber: null,
    zvanje: null
  };

  isSigned = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: string[] = [];
  username: string = '';

  constructor(private authService: AuthService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    const kandidat = Object.assign({}, this.form, this.korisnik);

    this.authService.registerCandidate(kandidat.username, kandidat.password, kandidat.email, kandidat.ime, kandidat.prezime,
      kandidat.datumRodjenja, kandidat.mjestoPrebivalista, kandidat.zvanje, kandidat.phoneNumber).subscribe({
      next: response => {
        this.isSignUpFailed = false;
        this.isSigned = true;
        //this.notificationService.showModalNotification(true, response.value.title, response.value.message);
        this.notificationService.showModalNotification(true, 'Account created', 'Your account has been successfully created, please login.');
        this.router.navigateByUrl('/login');
      },
      error: err => {

        if (err.status === 401) {
          this.errorMessage = err.error || 'Invalid username or password';
        }
        this.isSignUpFailed = true;
      }
    });
  }

  triggerEvent() {
    this.customEvent.emit();
  }
}



import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../../services/auth-service";
import {NotificationService} from "../../../../services/notification-service";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-signup-kompanija-opis',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    TranslatePipe
  ],
  templateUrl: './signup-kompanija-opis.component.html',
  styleUrl: './signup-kompanija-opis.component.css'
})
export class SignupKompanijaOpisComponent{

  @Output() customEvent = new EventEmitter<string>();
  @Input() kompanija: any;

  form: any = {
    kratkiOpis: null,
    opis: null,
  };

  isSigned = false;
  isSignUpFailed = false;
  errorMessage = '';
  username: string = '';
  role: string = "";

  constructor(private authService: AuthService,
              private notificationService: NotificationService,
              private router: Router) { }

  onSubmit() {
    const kompanija = Object.assign({}, this.form, this.kompanija);

    this.authService.registerCompany(kompanija.username, kompanija.password, kompanija.email, kompanija.naziv, kompanija.godinaOsnivanja,
      kompanija.lokacija, kompanija.logo, kompanija.brojZaposlenih, kompanija.kratkiOpis, kompanija.opis, kompanija.website,
      kompanija.linkedin, kompanija.twitter).subscribe({
      next: data => {
        this.isSignUpFailed = false;
        this.isSigned = true;
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

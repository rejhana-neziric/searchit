import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {AuthService} from "../../../services/auth-service";

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
    brojTelefona: null,
    zvanje: null
  };

  isSigned = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: string[] = [];
  username: string = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    const kandidat = Object.assign({}, this.form, this.korisnik);

    console.log("pozvan onsubit", kandidat);

    this.authService.registerCandidate(kandidat.username, kandidat.password, kandidat.email, kandidat.ime, kandidat.prezime,
      kandidat.datumRodjenja, kandidat.mjestoPrebivalista, kandidat.zvanje, kandidat.brojTelefona).subscribe({
      next: data => {
        this.isSignUpFailed = false;
        this.isSigned = true;
        this.reloadPage();
        console.log("pozvan endpoint")
      },
      error: err => {

        if (err.status === 401) {
          this.errorMessage = err.error || 'Invalid username or password';
        }
        this.isSignUpFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  triggerEvent() {
    this.customEvent.emit();
  }
}



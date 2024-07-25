import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {KandidatDodajEndpoint} from "../../../endpoints/kandidat/dodaj/kandidat-dodaj-endpoint";

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
export class SignupKandidatComponent {
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

  isSignUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: string[] = [];
  username: string = '';
  role: string = "";

  constructor(private kandidatDodajEndpoint: KandidatDodajEndpoint) {
  }

  onSubmit() {
    const kandidat = Object.assign({}, this.form, this.korisnik);

    this.kandidatDodajEndpoint.obradi(kandidat).subscribe(response => {
      console.log('Candidate registered successfully', response);
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  triggerEvent() {
    this.customEvent.emit();
  }
}

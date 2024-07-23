import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";

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

  onSubmit() {
    return false;
  }

  reloadPage(): void {
    window.location.reload();
  }

  triggerEvent() {
    this.customEvent.emit();
  }
}

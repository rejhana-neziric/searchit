import {Component, Output, EventEmitter} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-signup-kompanija-opis',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    NgClass
  ],
  templateUrl: './signup-kompanija-opis.component.html',
  styleUrl: './signup-kompanija-opis.component.css'
})
export class SignupKompanijaOpisComponent {

  @Output() customEvent = new EventEmitter<string>();

  form: any = {
    kratkiOpis: null,
    opis: null,
    website: null,
    linkedin: null,
    twitter: null
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

  triggerEvent() {
    this.customEvent.emit();
  }
}

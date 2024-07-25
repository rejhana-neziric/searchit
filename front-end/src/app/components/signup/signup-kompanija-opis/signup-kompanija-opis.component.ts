import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {KompanijaDodajEndpoint} from "../../../endpoints/kompanija-endpoint/dodaj/kompanija-dodaj-endpoint";

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
export class SignupKompanijaOpisComponent{

  @Output() customEvent = new EventEmitter<string>();
  @Input() kompanija: any;

  form: any = {
    kratkiOpis: null,
    opis: null,
  };

  isSignUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: string[] = [];
  username: string = '';
  role: string = "";

  constructor(private kompanijaDodajEndpoint: KompanijaDodajEndpoint) { }

  onSubmit() {
    const request = Object.assign({}, this.form, this.kompanija);

    this.kompanijaDodajEndpoint.obradi(request).subscribe(response => {
      console.log('Company registered successfully', response);
    });
  }

  triggerEvent() {
    this.customEvent.emit();
  }
}

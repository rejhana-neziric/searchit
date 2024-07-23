import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {
  GetBrojZaposlenihEndpoint
} from "../../../endpoints/kompanija-endpoint/get-broj-zaposlenih-range/get-broj-zaposlenih-endpoint";
import {SignupKompanijaOpisComponent} from "../signup-kompanija-opis/signup-kompanija-opis.component";

@Component({
  selector: 'app-signup-kompanija',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    NgForOf,
    NgIf,
    NgOptimizedImage,
    SignupKompanijaOpisComponent
  ],
  templateUrl: './signup-kompanija.component.html',
  styleUrl: './signup-kompanija.component.css'
})
export class SignupKompanijaComponent implements OnInit{
  @Output() customEvent = new EventEmitter<string>();


  form: any = {
    naziv: null,
    godinaOsnivanja: null,
    lokacija: null,
    logo: null,
    brojZaposlenih: null,
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
  godine: number[] = [];
  selectedImage: string | ArrayBuffer | null = null;
  brojZaposlenihRange: string[] = [];
  isRegisterDetails: boolean = false;

  constructor(private getBrojZaposlenihEndpoint : GetBrojZaposlenihEndpoint) {
  }

  onSubmit() {
    return false;
  }

  ngOnInit(){
    const trenutnaGodina = new Date().getFullYear();
    for (let godina = 1900; godina <= trenutnaGodina; godina++) {
      this.godine.push(godina);
    }
    this.godine = this.godine.reverse();
    this.getNumberOfEmployees();
  }

  reloadPage(): void {
    window.location.reload();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.selectedImage = null;
    // Reset the file input
    (document.getElementById('logo') as HTMLInputElement).value = '';
  }

  getNumberOfEmployees() {
    this.getBrojZaposlenihEndpoint.obradi().subscribe({
      next: x => {
        this.brojZaposlenihRange = x.lista;
      }
    })
  }

  showRegisterDetails() {
    this.isRegisterDetails?   this.isRegisterDetails = false : this.isRegisterDetails = true;
  }

  triggerEvent() {
    this.customEvent.emit();
  }
}

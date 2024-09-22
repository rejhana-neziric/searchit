import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {
  GetBrojZaposlenihEndpoint
} from "../../../../endpoints/kompanija-endpoint/get-broj-zaposlenih-range/get-broj-zaposlenih-endpoint";
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
  @Input() korisnik: any;

  form: any = {
    naziv: null,
    godinaOsnivanja: null,
    lokacija: null,
    logo: null,
    brojZaposlenih: null,
    website: null,
    linkedin: null,
    twitter: null
  };

  username: string = '';
  role: string = "";
  godine: number[] = [];
  selectedImage: string | ArrayBuffer | null = null;
  brojZaposlenihRange: string[] = [];
  isRegisterDetails: boolean = false;
  kompanija: any
  companyForm: FormGroup;

  constructor(private getBrojZaposlenihEndpoint : GetBrojZaposlenihEndpoint,
              private fb: FormBuilder) {
    this.companyForm = this.fb.group({
      naziv: [''],
      godinaOsnivanja: [''],
      lokacija: [''],
      brojZaposlenih: [''],
      website: [''],
      linkedin: [''],
      twitter: [''],
    });
  }

  ngOnInit(){
    this.getGodine();
    this.getNumberOfEmployees();
    this.kompanija =  Object.assign({}, this.form, this.korisnik);

  }

  getGodine() {
    const trenutnaGodina = new Date().getFullYear();
    for (let godina = 1900; godina <= trenutnaGodina; godina++) {
      this.godine.push(godina);
    }
    this.godine = this.godine.reverse();

    return this.godine;
  }

  onFileChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.selectedImage = reader.result;
        this.form.logo = e.target.result; // Base64 string of the image
      };

      reader.readAsDataURL(file);
    }
  }

  getNumberOfEmployees() {
    this.getBrojZaposlenihEndpoint.obradi().subscribe({
      next: x => {
        this.brojZaposlenihRange = x.lista.$values;
      }
    })

    return this.brojZaposlenihRange;
  }

  showRegisterDetails() {
    this.isRegisterDetails?   this.isRegisterDetails = false : this.isRegisterDetails = true;
    this.kompanija =  Object.assign({}, this.form, this.korisnik);
  }

  triggerEvent() {
    this.customEvent.emit();
  }
}

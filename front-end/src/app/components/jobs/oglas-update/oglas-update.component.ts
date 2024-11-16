import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OglasDodajComponent} from "../oglas-dodaj/oglas-dodaj.component";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {OglasGetByIdEndpoint} from "../../../endpoints/oglas-endpoint/get-by-id/oglas-get-by-id-endpoint";
import {FormsModule} from "@angular/forms";
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {OglasUpdateEndpoint} from "../../../endpoints/oglas-endpoint/update/oglas-update-endpoint";
import {
  OglasUpdateOglasIskustvo,
  OglasUpdateOglasLokacija,
  OglasUpdateRequest,
  OglasUpdateOpisOglasa
} from "../../../endpoints/oglas-endpoint/update/oglas-update-request";
import {ModalService} from "../../../services/modal-service";
import {FooterComponent} from "../../layout/footer/footer.component";
import {ModalComponent} from "../../notifications/modal/modal.component";

@Component({
  selector: 'app-oglas-update',
  standalone: true,
  imports: [
    OglasDodajComponent,
    FormsModule,
    NavbarComponent,
    FormsModule,
    RouterLink,
    NgClass,
    NgForOf,
    NgIf,
    FooterComponent,
    ModalComponent,
  ],
  templateUrl: './oglas-update.component.html',
  styleUrl: './oglas-update.component.css',
  providers: [DatePipe]
})
export class OglasUpdateComponent {
  @Output() customEvent = new EventEmitter<string>();
  @Input() oglas: any;

  public oglas_id: number = 0;
  form: OglasUpdateRequest = {
    oglas_id: this.oglas_id,
    naziv_pozicije: null,
    lokacija: [] as OglasUpdateOglasLokacija[],
    plata: null,
    tip_posla: null,
    rok_prijave: null,
    iskustvo: [] as OglasUpdateOglasIskustvo[],
    datum_modificiranja: null,
    objavljen: false,
    opis_oglasa: {} as OglasUpdateOpisOglasa
  };

  publishButtons = [
    { text: 'Cancel', class: 'btn-cancel', action: () => this.closePublishModal() },
    { text: 'Publish', class: 'btn-confirm', action: () => this.confirmPublish() }
  ];
  constructor(private route: ActivatedRoute,
              private oglasBetById: OglasGetByIdEndpoint,
              private oglasUpdateEndpoint: OglasUpdateEndpoint,
              private datePipe: DatePipe,
              private modalService: ModalService) {
  }

  getOglasById(id: number) {
    this.oglasBetById.obradi(id).subscribe(x => {
      this.form.iskustvo = x.iskustvo.$values;
      this.form.plata = x.plata;
      this.form.naziv_pozicije = x.nazivPozicije;
      this.form.lokacija = x.lokacija.$values;
      this.form.rok_prijave = String(x.rokPrijave).split('T')[0];
      this.form.tip_posla = x.tipPosla;
      this.form.oglas_id =this.oglas_id;
      this.form.objavljen = false;
      if (x.opisOglasa != null) {
        this.form.opis_oglasa.opis_pozicije = x.opisOglasa?.opisPozicije ?? null;
        this.form.opis_oglasa.benefiti = x.opisOglasa?.benefiti ?? null;
        this.form.opis_oglasa.vjestine = x.opisOglasa?.vjestine ?? null;
        this.form.opis_oglasa.minimum_godina_iskustva = x.opisOglasa?.minimumGodinaIskustva ?? null;
        this.form.opis_oglasa.preferirane_godine_iskustva = x.opisOglasa?.prefiraneGodineIskstva ?? null;
        this.form.opis_oglasa.kvalifikacije = x.opisOglasa?.kvalifikacija ?? null;

      }
    })
  }

  ngOnInit(): void {
    this.oglas_id = Number(this.route.snapshot.paramMap.get('id')); // Convert to number, if needed
    console.log('Job ID:', this.oglas_id);
    this.getOglasById(this.oglas_id)
    console.log(this.form)
  }

  removeIds(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(item => this.removeIds(item));
    } else if (typeof obj === 'object' && obj !== null) {
      const newObj: { [key: string]: any } = {};  // Explicitly define the type of newObj
      for (let key in obj) {
        if (key !== '$id') {
          newObj[key] = this.removeIds(obj[key]);
        }
      }
      return newObj;
    }
    return obj;
  }


  onSubmit(): void {
    this.form.oglas_id = this.oglas_id;
    this.form.objavljen = true;
    this.form.datum_modificiranja = new Date().toISOString();
    console.log('glavna funk', JSON.stringify(this.form));
    const sanitizedFormValue = this.removeIds(this.form);
    console.log('Sanitized form data:', JSON.stringify(sanitizedFormValue));

    this.oglasUpdateEndpoint.obradi(sanitizedFormValue).subscribe(response => {
      console.log("Oglas uspjesno dodan", response);
    });
  }

  // onCheckboxChange(event: Event, value: string): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.checked) {
  //     if (!this.form.iskustvo.includes(value)) {
  //       this.form.iskustvo.push(value);
  //     }
  //   } else {
  //     this.form.iskustvo = this.form.iskustvo.filter((item: string) => item !== value);
  //   }
  //   console.log(this.form.iskustvo)
  // }
  // onCheckboxChange(event: Event, iskustvoItem: OglasUpdateOglasIskustvo): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.checked) {
  //     if (!this.form.iskustvo.some(item => item.id === iskustvoItem.id)) {
  //       this.form.iskustvo.push(iskustvoItem);
  //     }
  //   } else {
  //     this.form.iskustvo = this.form.iskustvo.filter(item => item.id !== iskustvoItem.id);
  //   }
  //   console.log(this.form.iskustvo);
  // }
  onCheckboxChange(event: Event, naziv: string): void {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      if (!this.form.iskustvo.some(item => item.naziv === naziv)) {
        // Add the corresponding iskustvo item, assuming you have a predefined list or ids
        this.form.iskustvo.push({id: this.getIdForNaziv(naziv), naziv});
      }
    } else {
      this.form.iskustvo = this.form.iskustvo.filter(item => item.naziv !== naziv);
    }
    console.log(this.form.iskustvo);
  }

// Example helper method to get the ID based on the naziv
  private getIdForNaziv(naziv: string): number {
    const iskustvoMap: { [key: string]: number } = {
      'Senior': 1,
      'Medior': 2,
      'Junior': 3
    };

    // Explicitly check if the key exists in the map
    return iskustvoMap[naziv] !== undefined ? iskustvoMap[naziv] : 0;
  }
  // addLocation() {
  //   this.form.lokacija.push('');
  // }
  hasExperience(naziv: string): boolean {
    return this.form.iskustvo.some(item => item.naziv === naziv);
  }
  trackByFn(index: number, item: string) {
    return index;
  }

  onSubmitDraft(event: Event) {
    event.preventDefault();
    const now = new Date();
    this.form.datum_modificiranja = this.datePipe.transform(now, 'yyyy-MM-dd');
    this.form.objavljen = true;
    console.log("draft function");
    this.oglasUpdateEndpoint.obradi(this.form).subscribe(response => {
      console.log("Oglas successfully updated", response);
    });
  }

  openPublishModal() {
    this.modalService.openModal('publishModal', 'Confirm Publish', 'Are you sure you want to publish this job post?', []);
  }

  async closePublishModal() {
    await this.modalService.closeModal('publishModal');
  }

  async confirmPublish() {
    this.onSubmit();
    await this.modalService.closeModal('publishModal');
  }

}

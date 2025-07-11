import {Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID} from '@angular/core';
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {FormsModule} from "@angular/forms";
import {DatePipe, isPlatformBrowser, NgClass} from "@angular/common";
import {OglasDodajEndpoint} from "../../../endpoints/oglas-endpoint/dodaj/oglas-dodaj-endpoint";
import {response} from "express";
import {Router, RouterLink} from "@angular/router";
import {KompanijeGetEndpoint} from "../../../endpoints/kompanija-endpoint/get/kompanije-get-endpoint";
import {KompanijeGetResponseKomapanija} from "../../../endpoints/kompanija-endpoint/get/kompanije-get-response";
import {firstValueFrom} from "rxjs";
import {AppRoutingModule} from "../../../app.routes";
import {NotificationService} from "../../../services/notification-service";
import {AuthService} from "../../../services/auth-service";
import {User} from "../../../modals/user";
import {FooterComponent} from "../../layout/footer/footer.component";
import {CommonModule} from "@angular/common";
import {ModalComponent} from "../../notifications/modal/modal.component";
import {ModalService} from "../../../services/modal-service";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-oglas-dodaj',
  standalone: true,
  imports: [
    NavbarComponent,
    FormsModule,
    RouterLink,
    NgClass,
    FooterComponent,
    CommonModule,
    ModalComponent,
    TranslatePipe
  ],
  templateUrl: './oglas-dodaj.component.html',
  styleUrl: './oglas-dodaj.component.css',
  providers: [DatePipe]
})export class OglasDodajComponent implements OnInit {
  @Output() customEvent = new EventEmitter<string>();
  @Input() oglas: any;

  form: any = {
    kompanija_id: null,
    naziv_pozicije: null,
    lokacija: [''], // Start with one location input
    datum_objave: null,
    plata: null,
    tip_posla: null,
    rok_prijave: null,
    iskustvo: [] as string[],
    datum_modificiranja: null,
    opis_pozicije: null,
    minimum_godina_iskustva: null,
    preferirane_godine_iskustva: null,
    kvalifikacija: null,
    vjestine: null,
    benefiti: null,
    objavljen: false
  };

  kompanije: KompanijeGetResponseKomapanija[] = [];
  user: User = { id: "", role: "", jwt: "" };

  publishButtons = [
    { text: 'Cancel', class: 'btn-cancel', action: () => this.closePublishModal() },
    { text: 'Publish', class: 'btn-confirm', action: () => this.confirmPublish() }
  ];

  constructor(
    private oglasDodajEndpoint: OglasDodajEndpoint,
    private kompanijeGetEndpoint: KompanijeGetEndpoint,
    private notificationService: NotificationService,
    private authService: AuthService,
    private modalService: ModalService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any,
    private datePipe: DatePipe
  ) {
    this.getAll();
  }

  ngOnInit(): void {
    this.user = this.authService.getLoggedUser();
  }

  async getAll() {
    try {
      const response = await firstValueFrom(this.kompanijeGetEndpoint.obradi({}));
      this.kompanije = response.kompanije.$values;
    } catch (error) {
      console.log(error);
      this.kompanije = [];
    }
  }

  onSubmitDraft(event: Event) {
    event.preventDefault();
    const now = new Date();
    this.form.datum_modificiranja = this.datePipe.transform(now, 'yyyy-MM-dd');
    this.form.datum_objave = this.form.datum_modificiranja;
    this.form.kompanija_id = this.user.id;
    this.form.objavljen = false;
    console.log("draft function");
    this.oglasDodajEndpoint.obradi(this.form).subscribe(response => {
      console.log("Oglas successfully added", response);
    });

    this.router.navigateByUrl('/my-drafts');
  }

  onSubmit() {
    const now = new Date();
    this.form.datum_modificiranja = this.datePipe.transform(now, 'yyyy-MM-dd');
    this.form.datum_objave = this.form.datum_modificiranja;
    console.log(this.kompanije);
    this.form.kompanija_id = this.user.id;
    this.form.objavljen = true;
    console.log("submit function");
    this.oglasDodajEndpoint.obradi(this.form).subscribe(response => {
      this.notificationService.showModalNotification(true, 'Published', 'You have successfully published the job post.');
    });

    this.closePublishModal();

    this.router.navigateByUrl('/my-jobs');
  }

  onCheckboxChange(event: Event, value: string): void {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      if (!this.form.iskustvo.includes(value)) {
        this.form.iskustvo.push(value);
      }
    } else {
      this.form.iskustvo = this.form.iskustvo.filter((item: string) => item !== value);
    }
    console.log(this.form.iskustvo);
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

  addLocation() {
    this.form.lokacija.push('');
  }

  trackByFn(index: number, item: string) {
    return index;
  }
}


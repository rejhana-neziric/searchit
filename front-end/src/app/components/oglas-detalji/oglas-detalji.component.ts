import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {OglasGetByIdEndpoint} from "../../endpoints/oglas-endpoint/get-by-id/oglas-get-by-id-endpoint";
import {OglasGetByIdResponse} from "../../endpoints/oglas-endpoint/get-by-id/oglas-get-by-id-response";
import {FooterComponent} from "../footer/footer.component";
import {KandidatOglasDodajRequest} from "../../endpoints/kandidat-oglas-endpoint/dodaj/kandidat-oglas-dodaj-request";
import {User} from "../../modals/user";
import {AuthService} from "../../services/auth-service";
import {CVGetResponseCV} from "../../endpoints/cv-endpoint/get/cv-get-response";
import {CVGetRequest} from "../../endpoints/cv-endpoint/get/cv-get-request";
import {firstValueFrom} from "rxjs";
import {KandidatOglasDodajEndpoint} from "../../endpoints/kandidat-oglas-endpoint/dodaj/kandidat-oglas-dodaj-endpoint";
import {NotificationService} from "../../services/notification-service";
import {CVGetEndpoint} from "../../endpoints/cv-endpoint/get/cv-get-endpoint";
import {NotificationToastComponent} from "../notifications/notification-toast/notification-toast.component";

declare var bootstrap: any;

@Component({
  selector: 'app-oglas-detalji',
  standalone: true,
  imports: [
    NavbarComponent,
    DatePipe,
    NgForOf,
    NgIf,
    RouterLink,
    FooterComponent,
    NotificationToastComponent
  ],
  templateUrl: './oglas-detalji.component.html',
  styleUrl: './oglas-detalji.component.css'
})
export class OglasDetaljiComponent implements OnInit {

  oglasiId: number | undefined = undefined;
  oglas: OglasGetByIdResponse | null = null;
  imageUrl: string | ArrayBuffer | null = '';
  user: User = {id: "", role: "", jwt: ""}
  cv: CVGetResponseCV [] = [];
  cvIdApply: number | null = null;
  selectedCV: CVGetResponseCV | null = null;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private notificationService: NotificationService,
              private cvGetEndpoint: CVGetEndpoint,
              private kandidatOglasDodajEndpoint: KandidatOglasDodajEndpoint,
              private oglasGetByIdEndpoint: OglasGetByIdEndpoint) {
  }

  ngOnInit(): void {
    this.oglasiId = this.activatedRoute.snapshot.params["id"];
    this.getOglas();
    this.user = this.authService.getLoggedUser();
  }

  getOglas() {
    this.oglasGetByIdEndpoint.obradi(this.oglasiId!).subscribe({
      next: x => {
        this.oglas = x;
        console.log("oglas id = " + this.oglas.nazivPozicije);
      }
    })
  }

  razlikaDatuma(oglas: OglasGetByIdResponse) {
    let danasnjiDatum = new Date();
    let datum = new Date(oglas?.rokPrijave);
    let dani = Math.floor((datum.getTime() - danasnjiDatum.getTime()) / 1000 / 60 / 60 / 24);
    return dani;
  }

  ucitajLogo(logo: string | ArrayBuffer | null){
    this.imageUrl = `data:image/jpeg;base64,${logo}`;
    return this.imageUrl;
  }

  confirmApply() {
    var request: KandidatOglasDodajRequest = {
      oglasId: this.oglas?.id!,
      kandidatId: this.user.id,
      cVId: this.cvIdApply!,
      datumPrijave: new Date(),
    }

    this.kandidatOglasDodajEndpoint.obradi(request).subscribe({
      next: any => {
        this.notificationService.showModalNotification(true, 'Applied', 'You have successfully applied to this job.');
      },
      error: error => {
        if (error.error instanceof Object && error.error.message) {
          const  errorMessage = error.error.message;
          this.notificationService.addNotification({message: errorMessage, type: 'error'});

        } else {
          const  errorMessage = typeof error.error === 'string' ? error.error : 'An unknown error occurred';
          this.notificationService.addNotification({message: errorMessage, type: 'error'});

        }
      }
    })

    this.cvIdApply = null;
    this.closeApplyModal();
  }

  async apply() {
    await this.closeCVModal();
    const modalElement = document.getElementById('confirmApplyModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  closeApplyModal() {
    const modalElement = document.getElementById('confirmApplyModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  openCVModal() {


    if (this.cvIdApply) {
      this.closeApplyModal()
    }
    this.getAllCV();
    const modalElement = document.getElementById('confirmCVModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }

  }

  closeCVModal(): Promise<void> {
    return new Promise((resolve, reject) => {
      const modalElement = document.getElementById('confirmCVModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
          modalElement.addEventListener('hidden.bs.modal', () => {
            resolve();
          }, {once: true});
        } else {
          resolve();
        }
      } else {
        resolve();
      }
    });
  }


  async getAllCV() {
    var request: CVGetRequest = {
      kandidatId: this.user.id,
      objavljen: null,
      naziv: null
    };

    try {
      const response = await firstValueFrom(this.cvGetEndpoint.obradi(request));
      this.cv = response.cv.$values;
    } catch (error) {
      console.log(error);
      this.cv = [];
    }
  }

  selectCV(cv: CVGetResponseCV): void {
    this.selectedCV = cv;
    this.cvIdApply = cv.id;
  }
}

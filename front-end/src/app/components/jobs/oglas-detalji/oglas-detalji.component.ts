import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {OglasGetByIdEndpoint} from "../../../endpoints/oglas-endpoint/get-by-id/oglas-get-by-id-endpoint";
import {OglasGetByIdResponse} from "../../../endpoints/oglas-endpoint/get-by-id/oglas-get-by-id-response";
import {FooterComponent} from "../../layout/footer/footer.component";
import {KandidatOglasDodajRequest} from "../../../endpoints/kandidat-oglas-endpoint/dodaj/kandidat-oglas-dodaj-request";
import {User} from "../../../modals/user";
import {AuthService} from "../../../services/auth-service";
import {CVGetResponseCV} from "../../../endpoints/cv-endpoint/get/cv-get-response";
import {CVGetRequest} from "../../../endpoints/cv-endpoint/get/cv-get-request";
import {firstValueFrom} from "rxjs";
import {KandidatOglasDodajEndpoint} from "../../../endpoints/kandidat-oglas-endpoint/dodaj/kandidat-oglas-dodaj-endpoint";
import {NotificationService} from "../../../services/notification-service";
import {CVGetEndpoint} from "../../../endpoints/cv-endpoint/get/cv-get-endpoint";
import {NotificationToastComponent} from "../../notifications/notification-toast/notification-toast.component";
import {ModalComponent} from "../../notifications/modal/modal.component";
import {ModalService} from "../../../services/modal-service";
import {OglasiService} from "../../../services/oglasi.service";
import {TranslatePipe} from "@ngx-translate/core";

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
    NotificationToastComponent,
    ModalComponent,
    TranslatePipe
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

  chooseCVButtons = [
    {text: 'Cancel', class: 'btn-cancel', action: () => this.closeCVChooseModal()},
    {text: 'Continue', class: 'btn-confirm', action: () => this.confirmCVChoose()}
  ]

  applyButtons = [
    {text: 'Cancel', class: 'btn-cancel', action: () => this.closeApplyModal()},
    {text: 'Change CV', class: 'btn-confirm w-auto', action: () => this.openCVChooseModal()},
    {text: 'Apply', class: 'btn-confirm', action: () => this.confirmApply()}
  ]

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private notificationService: NotificationService,
              private modalService: ModalService,
              private oglasiService: OglasiService,
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
      }
    })
  }

  razlikaDatuma(oglas: OglasGetByIdResponse) {
    let danasnjiDatum = new Date();
    let datum = new Date(oglas?.rokPrijave);
    let dani = Math.floor((datum.getTime() - danasnjiDatum.getTime()) / 1000 / 60 / 60 / 24);
    return dani;
  }

  ucitajLogo(logo: string | ArrayBuffer | null) {
    this.imageUrl = `data:image/jpeg;base64,${logo}`;
    return this.imageUrl;
  }

  apply() {
    if (this.oglas?.id && this.cvIdApply) {
      const request: KandidatOglasDodajRequest = {
        oglasId: this.oglas?.id,
        kandidatId: this.user.id,
        cVId: this.cvIdApply,
        datumPrijave: new Date(),
      };

      this.oglasiService.apply(request);
      this.cvIdApply = null;
    }
  }

  openCVChooseModal() {
    if (this.user == null || this.user.role == 'Admin') {
      this.router.navigateByUrl('/login');
    } else {
      this.getAllCV();
      this.modalService.openModal('chooseCVModal', 'Choose CV', 'Choose CV you want to apply to job with.', []);
    }
  }

  async closeCVChooseModal() {
    await this.modalService.closeModal('chooseCVModal');
  }

  async confirmCVChoose() {
    await this.modalService.closeModal('chooseCVModal');
    this.openApplyModal();
  }

  openApplyModal() {
    this.modalService.openModal('applyModal', 'Confirm Application', "Are you sure you want to apply to this job with CV " + this.selectedCV?.naziv, []);
  }

  async closeApplyModal() {
    await this.modalService.closeModal('applyModal');
  }

  async confirmApply() {
    this.apply();
    await this.modalService.closeModal('applyModal');
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

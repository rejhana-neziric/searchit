import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {Router, RouterLink} from "@angular/router";
import {NotificationService} from "../../../services/notification-service";
import {AuthService} from "../../../services/auth-service";
import {CVGetEndpoint} from "../../../endpoints/cv-endpoint/get/cv-get-endpoint";
import {CVGetByIdEndpoint} from "../../../endpoints/cv-endpoint/get-by-id/cv-get-by-id-endpoint";
import {CVUpdateEndpoint} from "../../../endpoints/cv-endpoint/update/cv-update-endpoint";
import {User} from "../../../modals/user";
import {OglasGetRequest} from "../../../endpoints/oglas-endpoint/get/oglas-get-request";
import {OglasGetResponseOglasi} from "../../../endpoints/oglas-endpoint/get/oglas-get-response";
import {firstValueFrom} from "rxjs";
import {OglasGetEndpoint} from "../../../endpoints/oglas-endpoint/get/oglas-get-endpoint";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {NotificationToastComponent} from "../../notifications/notification-toast/notification-toast.component";
import {KandidatOglasGetEndpoint} from "../../../endpoints/kandidat-oglas-endpoint/get/kandidat-oglas-get-endpoint";
import {KandidatOglasGetRequest} from "../../../endpoints/kandidat-oglas-endpoint/get/kandidat-oglas-get-request";
import {
  KandidatOglasGetResponseKandidatOglas
} from "../../../endpoints/kandidat-oglas-endpoint/get/kandidat-oglas-get-response";
import {OglasGetByIdResponse} from "../../../endpoints/oglas-endpoint/get-by-id/oglas-get-by-id-response";
import {FooterComponent} from "../../layout/footer/footer.component";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-my-drafts',
  standalone: true,
  imports: [
    FormsModule,
    NavbarComponent,
    RouterLink,
    DatePipe,
    NgForOf,
    NgIf,
    NgxPaginationModule,
    NotificationToastComponent,
    FooterComponent,
    TranslatePipe
  ],
  templateUrl: './oglasi-draft.component.html',
  styleUrl: './oglasi-draft.component.css'
})
export class OglasiDraftComponent implements OnInit{
  pretragaNaziv: string = "";
  user: User = {id: "", role: "", jwt: ""}
  searchObject: OglasGetRequest | null = null;
  oglasi: OglasGetResponseOglasi [] = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;
  total: number = 10;
  applicants: KandidatOglasGetResponseKandidatOglas [] = [];
  imaRezultataPretrage: boolean = this.oglasi?.length != 0;
  selectedExperience: string = "";
  selectedStatus: string = "";
  filterListExperience = ['Junior', 'Medior', 'Senior'];
  filterStatus: string[] =  ['Opened', 'Closed'];
  filterLocation: string [] = ['Jablanica', 'Mostar', 'Sarajevo', 'Remote']

  constructor(private notificationService: NotificationService,
              private authService: AuthService,
              private router: Router,
              private oglasGetEndpoint: OglasGetEndpoint,
              private kandidatOglasGetEndpoint: KandidatOglasGetEndpoint,
              @Inject(PLATFORM_ID) private platformId: any) {
  }

  async ngOnInit(): Promise<void> {
    this.user = this.authService.getLoggedUser();
    await this.getAll();
    await this.getApplicants();
    this.setTotal();
  }

  navigateToEditJob(id: number) {
    this.router.navigate(['/edit-job', id], { skipLocationChange: false });
  }
  private setTotal() {
    this.total = this.oglasi.length;
  }

  pageChangeEvent($event: number, isNewPage: boolean) {
    this.currentPage = $event;
    this.setTotal();
    this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  onSearchChange(pretraga: string) {
    this.pretragaNaziv = pretraga;
    //this.getAll();
  }

  async getAll() {
    this.searchObject = {
      iskustvo: undefined,
      lokacija: undefined,
      minimumGodinaIskustva: undefined,
      naziv: this.pretragaNaziv,
      tipPosla: undefined,
      sortParametri: undefined,
      kandidatId: undefined,
      otvoren: undefined,
      objavljen: false,
      kompanijaId: this.user.id
    };

    try {
      const response = await firstValueFrom(this.oglasGetEndpoint.obradi(this.searchObject));
      this.oglasi = response.oglasi.$values;
      console.log(this.oglasi);
    } catch (error) {
      console.log(error);
      this.oglasi = [];
    }
  }

  renderOglas() {

    let response: OglasGetResponseOglasi [] = [];

    if (this.selectedExperience == "") {
      response = this.oglasi;
    } else {
      response = this.oglasi.filter(x =>
        x.iskustvo.$values.some(x =>
          x.naziv.toLowerCase().includes (this.selectedExperience.toLowerCase())))
    }

    if (this.pretragaNaziv != "") {
      response = response.filter(oglas =>
        oglas.nazivPozicije.toLowerCase().includes(this.pretragaNaziv) ||
        oglas.lokacija.$values.some(x => x.naziv.toLowerCase().includes (this.pretragaNaziv.toLowerCase())) ||
        oglas.iskustvo.$values.some(x => x.naziv.toLowerCase().includes (this.pretragaNaziv.toLowerCase()))
      );
    }


    /*return this.oglasi.filter(oglas =>
      oglas.nazivPozicije.toLowerCase().includes(this.pretragaNaziv) ||
      oglas.lokacija.$values.some(x => x.naziv.toLowerCase().includes (this.pretragaNaziv.toLowerCase())) ||
      oglas.iskustvo.$values.some(x => x.naziv.toLowerCase().includes (this.pretragaNaziv.toLowerCase()))
    );*/

    return response;
  }

  async getApplicants() {
    const request: KandidatOglasGetRequest = {
      kandidatId: null,
      kompanijaId: this.user.id,
      pretragaNaziv: "",
      spasen: null,
      status: null,
      otvoren: null
    };

    try {
      const response = await firstValueFrom(this.kandidatOglasGetEndpoint.obradi(request));
      this.applicants = response.kandidatOglasi.$values;
      this.imaRezultataPretrage = this.applicants?.length != 0;

    } catch (error) {
      this.applicants = [];
    }
  }

  calculateNumberOfApplicants(oglas: OglasGetResponseOglasi): number {
    return this.applicants.filter(x => x.oglasId == oglas.id).length;
  }

  razlikaDatuma(oglas: OglasGetResponseOglasi) {
    let danasnjiDatum = new Date();
    let datum = new Date(oglas?.rokPrijave);
    let dani = Math.floor((datum.getTime() - danasnjiDatum.getTime()) / 1000 / 60 / 60 / 24);
    return dani;
  }
}

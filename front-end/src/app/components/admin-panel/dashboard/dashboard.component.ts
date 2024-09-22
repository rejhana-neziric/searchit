import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {KorisnikGetEndpoint} from "../../../endpoints/korisnik-endpoint/get/korisnik-get-endpoint";
import {KorisnikGetResponseKorisnik} from "../../../endpoints/korisnik-endpoint/get/korisnik-get-response";
import {firstValueFrom} from "rxjs";
import {OglasGetResponseOglasi} from "../../../endpoints/oglas-endpoint/get/oglas-get-response";
import {OglasGetEndpoint} from "../../../endpoints/oglas-endpoint/get/oglas-get-endpoint";
import {OglasGetRequest} from "../../../endpoints/oglas-endpoint/get/oglas-get-request";
import {CVGetEndpoint} from "../../../endpoints/cv-endpoint/get/cv-get-endpoint";
import {CVGetRequest} from "../../../endpoints/cv-endpoint/get/cv-get-request";
import {CVGetResponseCV} from "../../../endpoints/cv-endpoint/get/cv-get-response";
import {KandidatOglasGetEndpoint} from "../../../endpoints/kandidat-oglas-endpoint/get/kandidat-oglas-get-endpoint";
import {KandidatOglasGetRequest} from "../../../endpoints/kandidat-oglas-endpoint/get/kandidat-oglas-get-request";
import {
  KandidatOglasGetResponseKandidatOglas
} from "../../../endpoints/kandidat-oglas-endpoint/get/kandidat-oglas-get-response";
import {NotificationService} from "../../../services/notification-service";
import {NotificationToastComponent} from "../../notifications/notification-toast/notification-toast.component";
import {FooterComponent} from "../../layout/footer/footer.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NavbarComponent,
    NotificationToastComponent,
    FooterComponent,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements  OnInit{
  activeUsers = 0;
  candidates = 0;
  companies = 0;

  inactiveUsers = 0;
  inactiveCandidates = 0;
  inactiveCompanies = 0;

  totalJobs = 0;
  openJobs = 0;
  closedJobs = 0;

  totalCVs = 0;
  publishedCVs = 0;
  unpublishedCVs = 0;

  totalApplicants = 0;
  acceptedApplicants = 0;

  korisnici: KorisnikGetResponseKorisnik[] = [];
  oglasi: OglasGetResponseOglasi[] = [];
  cv: CVGetResponseCV[] = [];
  applicants: KandidatOglasGetResponseKandidatOglas[] = [];

  constructor(private korisnikGetEndpoint: KorisnikGetEndpoint,
              private oglasGetEndpoint: OglasGetEndpoint,
              private cvGetEndpoint: CVGetEndpoint,
              private kandidatOglasGetEndpoint: KandidatOglasGetEndpoint,
              private notificationService: NotificationService) {
  }

  async ngOnInit(): Promise<void> {
    await this.getKorisnici();
    await this.getOglasi();
    await this.getCVs();
    await this.getApplicatns();
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.activeUsers = this.korisnici.filter(x => !x.isObrisan && x.uloga != 'Admin').length;  // Example data
    this.candidates = this.korisnici.filter(x => !x.isObrisan && x.uloga == 'Kandidat').length;
    this.companies = this.korisnici.filter(x => !x.isObrisan && x.uloga == 'Kompanija').length;

    this.inactiveUsers = this.korisnici.filter(x => x.isObrisan && x.uloga != 'Admin').length;  // Example data
    this.inactiveCandidates = this.korisnici.filter(x => x.isObrisan && x.uloga == 'Kandidat').length;
    this.inactiveCompanies = this.korisnici.filter(x => x.isObrisan && x.uloga == 'Kompanija').length;

    this.totalJobs = this.oglasi.filter(x => !x.isObrisan).length;
    this.openJobs = this.oglasi.filter(x => this.razlikaDatuma(x) > 0).length;
    this.closedJobs = this.oglasi.filter(x => this.razlikaDatuma(x) < 0).length;

    this.totalCVs = this.cv.length;
    this.publishedCVs = this.cv.filter(x => x.objavljen).length;
    this.unpublishedCVs = this.cv.filter(x => !x.objavljen).length;

    this.totalApplicants = this.applicants.length;
    this.acceptedApplicants = this.applicants.filter(x => x.status == 'Accepted').length;
  }

  async getKorisnici() {
    try {
      const response = await firstValueFrom(this.korisnikGetEndpoint.obradi());
      this.korisnici = response.korisnici.$values;
    } catch (error) {
      this.notificationService.addNotification({message: "Error occured", type: 'error'});
    }
  }

  async getOglasi() {
    const request : OglasGetRequest = { }
    try {
      const response = await firstValueFrom(this.oglasGetEndpoint.obradi(request));
      this.oglasi = response.oglasi.$values;
    } catch (error) {
      console.error('Error fetching korisnici:', error);
      // Handle the error as needed
    }
  }

  razlikaDatuma(oglas: OglasGetResponseOglasi) {
    let danasnjiDatum = new Date();
    let datum = new Date(oglas?.rokPrijave);
    let dani = Math.floor((datum.getTime() - danasnjiDatum.getTime()) / 1000 / 60 / 60 / 24);
    return dani;
  }

  async getCVs() {
    const request : CVGetRequest = {
      kandidatId: null,
      objavljen: null,
      naziv: null
    }

    try {
      const response = await firstValueFrom(this.cvGetEndpoint.obradi(request));
      this.cv = response.cv.$values;
    } catch (error) {
      console.error('Error fetching korisnici:', error);
      // Handle the error as needed
    }
  }

  async getApplicatns() {
    const request : KandidatOglasGetRequest = {
      kandidatId: null,
      kompanijaId: null,
      spasen: null,
      status: null,
      otvoren: null,
      pretragaNaziv: ""
    }

    try {
      const response = await firstValueFrom(this.kandidatOglasGetEndpoint.obradi(request));
      this.applicants = response.kandidatOglasi.$values;
    } catch (error) {
      console.error('Error fetching korisnici:', error);
      // Handle the error as needed
    }
  }
}

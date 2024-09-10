import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {NotificationToastComponent} from "../../notifications/notification-toast/notification-toast.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OglasGetResponseOglasi} from "../../../endpoints/oglas-endpoint/get/oglas-get-response";
import {OglasGetRequest} from "../../../endpoints/oglas-endpoint/get/oglas-get-request";
import {OglasGetEndpoint} from "../../../endpoints/oglas-endpoint/get/oglas-get-endpoint";
import {
  KandidatSpaseniOglasiUpdateEndpoint
} from "../../../endpoints/kandidat-spaseni-oglasi-endpoint/update/kandidat-spaseni-oglasi-update-endpoint";
import {NotificationService} from "../../../services/notification-service";
import {firstValueFrom} from "rxjs";
import {
  KanidatSpaseniOglasiUpdateRequest
} from "../../../endpoints/kandidat-spaseni-oglasi-endpoint/update/kanidat-spaseni-oglasi-update-request";
import {HttpErrorResponse} from "@angular/common/http";
import {KompanijeGetResponseKomapanija} from "../../../endpoints/kompanija-endpoint/get/kompanije-get-response";
import {KompanijeGetEndpoint} from "../../../endpoints/kompanija-endpoint/get/kompanije-get-endpoint";
import {
  KandidatSpaseneKompanijeUpdateEndpoint
} from "../../../endpoints/kandidat-spasene-kompanije-endpoint/update/kandidat-spasene-kompanije-update-endpoint";
import {KompanijeGetRequest} from "../../../endpoints/kompanija-endpoint/get/kompanije-get-request";
import {
  KandidatSpaseneKompanijeUpdateRequest
} from "../../../endpoints/kandidat-spasene-kompanije-endpoint/update/kandidat-spasene-kompanije-update-request";
import {RouterLink} from "@angular/router";
import { isPlatformBrowser } from '@angular/common';
import {AuthService} from "../../../services/auth-service";
import {User} from "../../../modals/user";

declare var bootstrap: any;


@Component({
  selector: 'app-favorites-kompanije',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    NgxPaginationModule,
    NotificationToastComponent,
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './favorites-kompanije.component.html',
  styleUrl: './favorites-kompanije.component.css'
})
export class FavoritesKompanijeComponent {
  kompanije: KompanijeGetResponseKomapanija [] = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;
  total: number = 10;
  imaRezultataPretrage: boolean = this.kompanije?.length != 0;
  searchObject: KompanijeGetRequest | null = null;
  selectedCompany: any;
  noCompanies: boolean = this.kompanije?.length == 0;
  pretragaNaziv: string = "";
  kandidat: User = {id: "", role: "", jwt: ""}

  imageUrl: string | ArrayBuffer | null = '';

  constructor(private kompanijeGetEndpoint: KompanijeGetEndpoint,
              private kandidatSpaseneKompanijeUpdateEndpoint: KandidatSpaseneKompanijeUpdateEndpoint,
              private notificationService: NotificationService,
              private authService: AuthService,
              @Inject(PLATFORM_ID) private platformId: any) {
  }

  async ngOnInit(): Promise<void> {
    this.setTotal();
    this.kandidat = this.authService.getLoggedUser();
    await this.getAll();
  }

  onSearchChange(pretraga: string) {
    this.pretragaNaziv = pretraga;
    this.getAll();
    this.renderKompanije();
  }

  private setTotal() {
    this.total = this.kompanije.length;
  }

  pageChangeEvent($event: number) {
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

  async getAll() {
    this.searchObject = {
      naziv: this.pretragaNaziv,
      spasen: true,
      kandidatId: this.kandidat.id
    };

    try {
      const response = await firstValueFrom(this.kompanijeGetEndpoint.obradi(this.searchObject));
      this.kompanije = response.kompanije.$values;
      this.imaRezultataPretrage = this.kompanije?.length != 0;
      this.noCompanies = this.kompanije?.length == 0;
    } catch (error) {
      console.log(error);
      this.kompanije = [];
    }

    console.log(this.imaRezultataPretrage);
  }

  renderKompanije() {
    return this.kompanije
  }

  async unsaveKompanija(kompanija: KompanijeGetResponseKomapanija) {
    var request: KandidatSpaseneKompanijeUpdateRequest = {
      kompanija_id: kompanija.id,
      kandidat_id: this.kandidat.id, spasen: false //promijeniti kasnije u trenutno logiranog korisnika
    };

    try {
      const data = await firstValueFrom(this.kandidatSpaseneKompanijeUpdateEndpoint.obradi(request));
      this.notificationService.addNotification({message: 'Company removed.', type: 'success'});
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        this.notificationService.addNotification({message: `Error: ${error.message}`, type: 'error'});
      } else {
        this.notificationService.addNotification({message: 'An unexpected error occurred.', type: 'error'});
      }
    }

    await this.getAll();

    this.renderKompanije();
  }

  confirmUnsave() {
    this.unsaveKompanija(this.selectedCompany);
    this.closeModal();
  }

  openUnsaveModal(company: any) {
    this.selectedCompany = company;
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('confirmUnsaveModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  closeModal() {
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('confirmUnsaveModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
    }
  }

  ucitajLogo(logo: string | ArrayBuffer | null){
    this.imageUrl = `data:image/jpeg;base64,${logo}`;
    return this.imageUrl;
  }
}

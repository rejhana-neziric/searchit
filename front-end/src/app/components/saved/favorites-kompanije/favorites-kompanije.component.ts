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
import {ModalComponent} from "../../notifications/modal/modal.component";
import {ModalService} from "../../../services/modal-service";
import {SharedService} from "../../../services/shared.service";
import {KompanijaService} from "../../../services/kompanija.service";

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
        RouterLink,
        ModalComponent
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

  unsaveButtons = [
    { text: 'Cancel', class: 'btn-cancel', action: () => this.closeUnSaveModal() },
    { text: 'Unsave', class: 'btn-confirm', action: () => this.confirmUnSave() }
  ];

  constructor(private kandidatSpaseneKompanijeUpdateEndpoint: KandidatSpaseneKompanijeUpdateEndpoint,
              private notificationService: NotificationService,
              private authService: AuthService,
              private modalService: ModalService,
              private sharedService: SharedService,
              private kompanijaService: KompanijaService,
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

  setTotal() {
    this.total = this.sharedService.setTotal(this.kompanije);
  }

  pageChangeEvent($event: number) {
    this.currentPage = this.sharedService.pageChangeEvent($event, this.currentPage);
    this.setTotal();
    this.sharedService.scrollToTop();
  }

  async getAll() {
    this.searchObject = {
      naziv: this.pretragaNaziv,
      spasen: true,
      kandidatId: this.kandidat.id
    };

    this.kompanije = await this.kompanijaService.getAll(this.searchObject);
    this.imaRezultataPretrage = this.kompanije?.length != 0;
    this.noCompanies = this.kompanije?.length == 0;
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

  openUnSaveModal(company: any) {
    this.selectedCompany = company;
    this.modalService.openModal('unsaveModal', 'Confirm Unsave', 'Are you sure you want to unsave this company?', []);
  }

  async closeUnSaveModal() {
    await this.modalService.closeModal('unsaveModal');
  }

  async confirmUnSave() {
    this.unsaveKompanija(this.selectedCompany);
    await this.modalService.closeModal('unsaveModal');
  }

  ucitajLogo(logo: string | ArrayBuffer | null){
    this.imageUrl = `data:image/jpeg;base64,${logo}`;
    return this.imageUrl;
  }

}

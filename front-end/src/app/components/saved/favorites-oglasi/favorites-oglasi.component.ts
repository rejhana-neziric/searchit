import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
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
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {NgxPaginationModule} from "ngx-pagination";
import {NotificationToastComponent} from "../../notifications/notification-toast/notification-toast.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import { isPlatformBrowser } from '@angular/common';
import {User} from "../../../modals/user";
import {AuthService} from "../../../services/auth-service";
import {ModalComponent} from "../../notifications/modal/modal.component";
import {ModalService} from "../../../services/modal-service";
import {SharedService} from "../../../services/shared.service";
import {OglasiService} from "../../../services/oglasi.service";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-favorites-oglasi',
  standalone: true,
  imports: [
    DatePipe,
    NavbarComponent,
    NgForOf,
    NgIf,
    NgxPaginationModule,
    NotificationToastComponent,
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    ModalComponent,
    TranslatePipe
  ],
  templateUrl: './favorites-oglasi.component.html',
  styleUrl: './favorites-oglasi.component.css'
})
export class FavoritesOglasiComponent implements OnInit{
  oglasi: OglasGetResponseOglasi [] = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;
  total: number = 10;
  imaRezultataPretrage: boolean = this.oglasi?.length != 0;
  searchObject: OglasGetRequest | null = null;
  selectedPost: any;
  noPosts: boolean = this.oglasi?.length == 0;
  pretragaNaziv: string = "";
  kandidat: User = {id: "", role: "", jwt: ""}
  imageUrl: string | ArrayBuffer | null = '';

  unsaveButtons = [
    { text: 'Cancel', class: 'btn-cancel', action: () => this.closeUnSaveModal() },
    { text: 'Unsave', class: 'btn-confirm', action: () => this.confirmUnSave() }
  ];

  constructor(private oglasGetAllEndpoint: OglasGetEndpoint,
              private kandidatSpaseniOglasiUpdateEndpoint: KandidatSpaseniOglasiUpdateEndpoint,
              private notificationService: NotificationService,
              private authService: AuthService,
              private modalService: ModalService,
              private sharedService: SharedService,
              private oglasiService: OglasiService,
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
    this.renderOglasi();
  }

  setTotal() {
    this.total = this.sharedService.setTotal(this.oglasi);
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

    this.oglasi = await this.oglasiService.getAll(this.searchObject);
    this.imaRezultataPretrage = this.oglasi?.length != 0;
    this.noPosts = this.oglasi?.length == 0;
  }

  renderOglasi() {
    return this.oglasi
  }

  async unsaveOglas(oglas: OglasGetResponseOglasi) {
    var request: KanidatSpaseniOglasiUpdateRequest = {
      oglas_id: oglas.id,
      kandidat_id: this.kandidat.id
    };

    try {
      const data = await firstValueFrom(this.kandidatSpaseniOglasiUpdateEndpoint.obradi(request));
      this.notificationService.addNotification({message: 'Post removed.', type: 'success'});
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        this.notificationService.addNotification({message: `Error: ${error.message}`, type: 'error'});
      } else {
        this.notificationService.addNotification({message: 'An unexpected error occurred.', type: 'error'});
      }
    }

    await this.getAll();

    this.renderOglasi();
  }

  openUnSaveModal(post: any) {
  this.selectedPost = post;
    this.modalService.openModal('unsaveModal', 'Confirm Unsave', 'Are you sure you want to unsave this job post?', []);
  }

  async closeUnSaveModal() {
    await this.modalService.closeModal('unsaveModal');
  }

  async confirmUnSave() {
    this.unsaveOglas(this.selectedPost);
    await this.modalService.closeModal('unsaveModal');
  }

  ucitajLogo(logo: string | ArrayBuffer | null){
    this.imageUrl = `data:image/jpeg;base64,${logo}`;
    return this.imageUrl;
  }
}

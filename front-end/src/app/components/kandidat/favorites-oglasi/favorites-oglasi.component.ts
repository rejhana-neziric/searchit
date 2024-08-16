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
import {NavbarComponent} from "../../navbar/navbar.component";
import {NgxPaginationModule} from "ngx-pagination";
import {NotificationToastComponent} from "../../notifications/notification-toast/notification-toast.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import { isPlatformBrowser } from '@angular/common';
import {User} from "../../../modals/user";
import {AuthService} from "../../../services/auth-service";

declare var bootstrap: any;

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
    MatButtonToggle
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

  constructor(private oglasGetAllEndpoint: OglasGetEndpoint,
              private kandidatSpaseniOglasiUpdateEndpoint: KandidatSpaseniOglasiUpdateEndpoint,
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
    this.renderOglasi();
  }

  private setTotal() {
    this.total = this.oglasi.length;
  }

  pageChangeEvent($event: number) {
    this.currentPage = $event;
    this.setTotal();
    this.scrollToTop();
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  async getAll() {
    this.searchObject = {
      naziv: this.pretragaNaziv,
      spasen: true,
      kandidatId: this.kandidat.id
    };

    try {
      const response = await firstValueFrom(this.oglasGetAllEndpoint.obradi(this.searchObject));
      this.oglasi = response.oglasi;
      this.imaRezultataPretrage = this.oglasi?.length != 0;
      this.noPosts = this.oglasi?.length == 0;
    } catch (error) {
      console.log(error);
      this.oglasi = [];
    }
  }

  renderOglasi() {
    return this.oglasi
  }

  async unsaveOglas(oglas: OglasGetResponseOglasi) {
    var request: KanidatSpaseniOglasiUpdateRequest = {
      oglas_id: oglas.id,
      kandidat_id: this.kandidat.id//promijeniti kasnije u trenutno logiranog korisnika
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

  confirmUnsave() {
    this.unsaveOglas(this.selectedPost);
    this.closeModal();
  }

  openUnsaveModal(post: any) {
    this.selectedPost = post;
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
}

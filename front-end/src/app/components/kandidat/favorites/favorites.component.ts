import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";
import {FormsModule} from "@angular/forms";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {NotificationComponent} from "../../notification/notification.component";
import {OglasGetResponseOglasi} from "../../../endpoints/oglas-endpoint/get/oglas-get-response";
import {OglasGetEndpoint} from "../../../endpoints/oglas-endpoint/get/oglas-get-endpoint";
import {firstValueFrom} from "rxjs";
import {OglasGetRequest} from "../../../endpoints/oglas-endpoint/get/oglas-get-request";
import {RouterLink} from "@angular/router";
import {
  KanidatSpaseniOglasiDodajRequest
} from "../../../endpoints/kandidat-spaseni-oglasi-endpoint/dodaj/kanidat-spaseni-oglasi-dodaj-request";
import {HttpErrorResponse} from "@angular/common/http";
import {
  KandidatSpaseniOglasiDodajEndpoint
} from "../../../endpoints/kandidat-spaseni-oglasi-endpoint/dodaj/kandidat-spaseni-oglasi-dodaj-endpoint";
import {NotificationService} from "../../notification/notification-service";
import {
  KandidatSpaseniOglasiUpdateEndpoint
} from "../../../endpoints/kandidat-spaseni-oglasi-endpoint/update/kandidat-spaseni-oglasi-update-endpoint";
import {
  KanidatSpaseniOglasiUpdateRequest
} from "../../../endpoints/kandidat-spaseni-oglasi-endpoint/update/kanidat-spaseni-oglasi-update-request";

declare var bootstrap: any;

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    NavbarComponent,
    FormsModule,
    DatePipe,
    NgForOf,
    NgIf,
    NgxPaginationModule,
    NotificationComponent,
    RouterLink
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {

  oglasi: OglasGetResponseOglasi [] = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;
  total: number = 10;
  imaRezultataPretrage: boolean = this.oglasi?.length != 0;
  searchObject: OglasGetRequest | null = null;
  selectedPost: any;
  noPosts: boolean = this.oglasi?.length == 0;
  pretragaNaziv: string = "";

  constructor(private oglasGetAllEndpoint: OglasGetEndpoint,
              private kandidatSpaseniOglasiUpdateEndpoint: KandidatSpaseniOglasiUpdateEndpoint,
              private notificationService: NotificationService) {
  }

  async ngOnInit(): Promise<void> {
    this.setTotal();
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  async getAll() {
    this.searchObject = {
      naziv: this.pretragaNaziv,
      spasen: true,
      kandidatId: 25
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
      kandidat_id: 25 //promijeniti kasnije u trenutno logiranog korisnika
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
    const modalElement = document.getElementById('confirmUnsaveModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  closeModal() {
    const modalElement = document.getElementById('confirmUnsaveModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }
}



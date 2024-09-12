import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";
import {FavoritesKompanijeComponent} from "../../kandidat/favorites-kompanije/favorites-kompanije.component";
import {FavoritesOglasiComponent} from "../../kandidat/favorites-oglasi/favorites-oglasi.component";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {DatePipe, isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {NotificationToastComponent} from "../../notifications/notification-toast/notification-toast.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {KompanijeGetResponseKomapanija} from "../../../endpoints/kompanija-endpoint/get/kompanije-get-response";
import {KompanijeGetRequest} from "../../../endpoints/kompanija-endpoint/get/kompanije-get-request";
import {User} from "../../../modals/user";
import {KompanijeGetEndpoint} from "../../../endpoints/kompanija-endpoint/get/kompanije-get-endpoint";
import {
  KandidatSpaseneKompanijeUpdateEndpoint
} from "../../../endpoints/kandidat-spasene-kompanije-endpoint/update/kandidat-spasene-kompanije-update-endpoint";
import {NotificationService} from "../../../services/notification-service";
import {AuthService} from "../../../services/auth-service";
import {firstValueFrom} from "rxjs";
import {
  KandidatSpaseneKompanijeUpdateRequest
} from "../../../endpoints/kandidat-spasene-kompanije-endpoint/update/kandidat-spasene-kompanije-update-request";
import {HttpErrorResponse} from "@angular/common/http";
import {KandidatOglasGetEndpoint} from "../../../endpoints/kandidat-oglas-endpoint/get/kandidat-oglas-get-endpoint";
import {
  KandidatOglasUpdateEndpoint
} from "../../../endpoints/kandidat-oglas-endpoint/update/kandidat-oglas-update-endpoint";
import {
  KandidatOglasGetResponseKandidatOglas
} from "../../../endpoints/kandidat-oglas-endpoint/get/kandidat-oglas-get-response";
import {KandidatOglasGetRequest} from "../../../endpoints/kandidat-oglas-endpoint/get/kandidat-oglas-get-request";
import {
  KandidatOglasUpdateRequest
} from "../../../endpoints/kandidat-oglas-endpoint/update/kandidat-oglas-update-request";
import {FooterComponent} from "../../footer/footer.component";

declare var bootstrap: any;

@Component({
  selector: 'app-favorites-kandidati',
  standalone: true,
  imports: [
    NavbarComponent,
    FavoritesKompanijeComponent,
    FavoritesOglasiComponent,
    MatButtonToggle,
    MatButtonToggleGroup,
    NgIf,
    NgForOf,
    NgxPaginationModule,
    NotificationToastComponent,
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
    DatePipe,
    FooterComponent
  ],
  templateUrl: './favorites-kandidati.component.html',
  styleUrl: './favorites-kandidati.component.css'
})
export class FavoritesKandidatiComponent {
  kandidati: KandidatOglasGetResponseKandidatOglas [] = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;
  total: number = 10;
  imaRezultataPretrage: boolean = this.kandidati?.length != 0;
  searchObject: KandidatOglasGetRequest | null = null;
  selectedCompany: any;
  noCompanies: boolean = this.kandidati?.length == 0;
  pretragaNaziv: string = "";
  user: User = {id: "", role: "", jwt: ""}

  constructor(private kandidatOglasGetEndpoint: KandidatOglasGetEndpoint,
              private kandidatOglasUpdateEndpoint: KandidatOglasUpdateEndpoint,
              private notificationService: NotificationService,
              private authService: AuthService,
              @Inject(PLATFORM_ID) private platformId: any) {
  }

  async ngOnInit(): Promise<void> {
    this.setTotal();
    this.user = this.authService.getLoggedUser();
    await this.getAll();
  }

  onSearchChange(pretraga: string) {
    this.pretragaNaziv = pretraga;
    this.getAll();
    this.renderKompanije();
  }

  private setTotal() {
    this.total = this.kandidati.length;
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

  async getAll() {
    this.searchObject = {
      kandidatId: null,
      kompanijaId: this.user.id,
      pretragaNaziv: this.pretragaNaziv,
      spasen: true,
      status: null,
      otvoren: null
    };

    console.log(this.searchObject)

    try {
      const response = await firstValueFrom(this.kandidatOglasGetEndpoint.obradi(this.searchObject));
      this.kandidati = response.kandidatOglasi.$values;
      this.imaRezultataPretrage = this.kandidati?.length != 0;
      this.noCompanies = this.kandidati?.length == 0;
      console.log(response)
    } catch (error) {
      console.log(error);
      this.kandidati = [];
    }

    console.log(this.imaRezultataPretrage);

  }


  renderKompanije() {
    return this.kandidati
  }

  async save(kandidatOglas: KandidatOglasGetResponseKandidatOglas, spasen: boolean) {
    var request: KandidatOglasUpdateRequest = {
      id: kandidatOglas.id,
      kompanijaId: this.user.id,
      kandidatId: kandidatOglas.kandidatId,
      status: null,
      spasen: spasen
    };

    try {
      const data = await firstValueFrom(this.kandidatOglasUpdateEndpoint.obradi(request));
      if(spasen) {
        this.notificationService.addNotification({message: 'Applicant saved.', type: 'success'});
      } else {
        this.notificationService.addNotification({message: 'Applicant removed.', type: 'success'});
      }

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



  async unsaveKompanija(kandidatOglas: KandidatOglasGetResponseKandidatOglas) {
    var request: KandidatOglasUpdateRequest = {
      id: kandidatOglas.id,
      kompanijaId: this.user.id,
      kandidatId: kandidatOglas.kandidatId,
      status: null,
      spasen: false
    };

    try {
      const data = await firstValueFrom(this.kandidatOglasUpdateEndpoint.obradi(request));
      this.notificationService.addNotification({message: 'Applicant removed.', type: 'success'});
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
}

import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {FavoritesKompanijeComponent} from "../favorites-kompanije/favorites-kompanije.component";
import {FavoritesOglasiComponent} from "../favorites-oglasi/favorites-oglasi.component";
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
import {FooterComponent} from "../../layout/footer/footer.component";
import {ModalComponent} from "../../notifications/modal/modal.component";
import {ModalService} from "../../../services/modal-service";


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
        FooterComponent,
        ModalComponent
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
  selectedApplicant: any;
  noCompanies: boolean = this.kandidati?.length == 0;
  pretragaNaziv: string = "";
  user: User = {id: "", role: "", jwt: ""}

  unsaveButtons = [
    { text: 'Cancel', class: 'btn-cancel', action: () => this.closeUnSaveModal() },
    { text: 'Unsave', class: 'btn-confirm', action: () => this.confirmUnSave() }
  ];

  constructor(private kandidatOglasGetEndpoint: KandidatOglasGetEndpoint,
              private kandidatOglasUpdateEndpoint: KandidatOglasUpdateEndpoint,
              private notificationService: NotificationService,
              private authService: AuthService,
              private modalService: ModalService,
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
    this.renderKandidati();
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


  renderKandidati() {
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
    this.renderKandidati();
  }



  async unsaveKandidat(kandidatOglas: KandidatOglasGetResponseKandidatOglas) {
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
    this.renderKandidati();
  }

  openUnSaveModal(applicant: any) {
    this.selectedApplicant = applicant;
    this.modalService.openModal('unsaveModal', 'Confirm Unsave', 'Are you sure you want to unsave this applicant?', []);
  }

  async closeUnSaveModal() {
    await this.modalService.closeModal('unsaveModal');
  }

  async confirmUnSave() {
    this.unsaveKandidat(this.selectedApplicant);
    await this.modalService.closeModal('unsaveModal');
  }
}

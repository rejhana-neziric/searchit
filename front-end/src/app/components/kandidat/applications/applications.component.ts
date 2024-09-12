import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";
import {DatePipe, isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {NotificationToastComponent} from "../../notifications/notification-toast/notification-toast.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {User} from "../../../modals/user";
import {NotificationService} from "../../../services/notification-service";
import {AuthService} from "../../../services/auth-service";
import {KandidatOglasGetEndpoint} from "../../../endpoints/kandidat-oglas-endpoint/get/kandidat-oglas-get-endpoint";
import {firstValueFrom} from "rxjs";
import {KandidatOglasGetRequest} from "../../../endpoints/kandidat-oglas-endpoint/get/kandidat-oglas-get-request";
import {
  KandidatOglasGetResponseKandidatOglas
} from "../../../endpoints/kandidat-oglas-endpoint/get/kandidat-oglas-get-response";
import {RouterLink} from "@angular/router";
import {FooterComponent} from "../../footer/footer.component";
import {StatusPrijaveGetEndpoint} from "../../../endpoints/status-prijave-endpoint/get/status-prijave-get-endpoint";

declare var bootstrap: any;

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [
    NavbarComponent,
    DatePipe,
    NgForOf,
    NgIf,
    NgxPaginationModule,
    NotificationToastComponent,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    FooterComponent
  ],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent implements OnInit {
  oglasi: KandidatOglasGetResponseKandidatOglas [] = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;
  total: number = 10;
  imaRezultataPretrage: boolean = this.oglasi?.length != 0;
  searchObject: KandidatOglasGetRequest | null = null;
  selectedPost: any;
  noPosts: boolean = this.oglasi?.length == 0;
  pretragaNaziv: string = "";
  kandidat: User = {id: "", role: "", jwt: ""}
  selectedStatus: string | null = null;
  statusiPrijave: string[] = [];
  statusiOglasa: boolean[] = [true, false];
  selectedStatusOglasa: boolean | null = null;

  constructor(private kandidatOglasGetEndpoint: KandidatOglasGetEndpoint,
              private statusPrijaveGetEndpoint: StatusPrijaveGetEndpoint,
              private notificationService: NotificationService,
              private authService: AuthService,
              @Inject(PLATFORM_ID) private platformId: any) {
  }

  async ngOnInit(): Promise<void> {
    this.setTotal();
    this.kandidat = this.authService.getLoggedUser();
    await this.getAll();
    await this.getStatusiPrijave();
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
      kandidatId: this.kandidat.id,
      kompanijaId: null,
      pretragaNaziv: this.pretragaNaziv,
      spasen: null,
      status: this.selectedStatus,
      otvoren: this.selectedStatusOglasa
    };

    try {
      const response = await firstValueFrom(this.kandidatOglasGetEndpoint.obradi(this.searchObject));
      this.oglasi = response.kandidatOglasi.$values;
      this.imaRezultataPretrage = this.oglasi?.length != 0;
    } catch (error) {
      console.log(error);
      this.oglasi = [];
    }
  }

  renderOglasi() {
    this.imaRezultataPretrage = this.oglasi?.length != 0;
    this.setTotal();

    return this.oglasi;
  }

  onSearchChange(pretraga: string) {
    this.pretragaNaziv = pretraga;
    this.getAll();
    this.renderOglasi();
  }

  confirmWithdraw() {
    console.log('pozvan withdraw')
    this.oglasi.shift();
    this.imaRezultataPretrage = this.oglasi?.length != 0;
    this.notificationService.addNotification({
      message: 'Application has successfully been withdrawn.',
      type: 'success'
    });
    this.renderOglasi();
    this.closeWithdrawModal()
  }

  openWithdrawModal() {
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('confirmWirhdraxModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  closeWithdrawModal() {
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('confirmWirhdraxModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
    }
  }

  async getStatusiPrijave() {
    this.statusPrijaveGetEndpoint.obradi().subscribe({
      next: x => {
        this.statusiPrijave = x.lista.$values
      },
      error: err => {
        console.error('Error fetching skills:', err);
      }
    })
  }

  onStatusChange(status: string) {
    this.selectedStatus = status;
    this.getAll();
  }

  onStatusOglasaChange(status: boolean) {
    this.selectedStatusOglasa = status;
    this.getAll();
  }
}

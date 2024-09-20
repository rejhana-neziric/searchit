import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {NavbarComponent} from "../layout/navbar/navbar.component";
import {DatePipe, isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {NotificationToastComponent} from "../notifications/notification-toast/notification-toast.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {User} from "../../modals/user";
import {NotificationService} from "../../services/notification-service";
import {AuthService} from "../../services/auth-service";
import {KandidatOglasGetEndpoint} from "../../endpoints/kandidat-oglas-endpoint/get/kandidat-oglas-get-endpoint";
import {firstValueFrom} from "rxjs";
import {KandidatOglasGetRequest} from "../../endpoints/kandidat-oglas-endpoint/get/kandidat-oglas-get-request";
import {
  KandidatOglasGetResponseKandidatOglas
} from "../../endpoints/kandidat-oglas-endpoint/get/kandidat-oglas-get-response";
import {RouterLink} from "@angular/router";
import {FooterComponent} from "../layout/footer/footer.component";
import {StatusPrijaveGetEndpoint} from "../../endpoints/status-prijave-endpoint/get/status-prijave-get-endpoint";
import {
  KandidatOglasDeleteEndpoint
} from "../../endpoints/kandidat-oglas-endpoint/delete/kandidat-oglas-delete-endpoint";
import {ModalComponent} from "../notifications/modal/modal.component";
import {ModalService} from "../../services/modal-service";
import {SharedService} from "../../services/shared.service";


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
        FooterComponent,
        ModalComponent
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
  pretragaNaziv: string = "";
  kandidat: User = {id: "", role: "", jwt: ""}
  selectedStatus: string | null = null;
  statusiPrijave: string[] = [];
  statusiOglasa: boolean[] = [true, false];
  selectedStatusOglasa: boolean | null = null;
  selectedOglasId: number | null = null;

  withdrawButtons = [
    { text: 'Cancel', class: 'btn-cancel', action: () => this.closeWithdrawModal() },
    { text: 'Withdraw', class: 'btn-danger', action: () => this.confirmWithdraw() }
  ];

  constructor(private kandidatOglasGetEndpoint: KandidatOglasGetEndpoint,
              private statusPrijaveGetEndpoint: StatusPrijaveGetEndpoint,
              private kandidatOglasDeleteEndpoint: KandidatOglasDeleteEndpoint,
              private notificationService: NotificationService,
              private authService: AuthService,
              private modalService: ModalService,
              private sharedService: SharedService,
              @Inject(PLATFORM_ID) private platformId: any) {
  }

  async ngOnInit(): Promise<void> {
    this.setTotal();
    this.kandidat = this.authService.getLoggedUser();
    await this.getAll();
    await this.getStatusiPrijave();
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

  withdraw() {
    this.kandidatOglasDeleteEndpoint.obradi(this.selectedOglasId!).subscribe({
      next: any => {
        this.notificationService.addNotification({message: 'Your application has been successfully withdrawn.', type: 'success'});
        this.imaRezultataPretrage = this.oglasi?.length != 0;
        this.getAll();
      },
      error: error => {
        this.notificationService.addNotification({
          message: 'Sorry, there was mistake. Please try again..',
          type: 'error'
        });
      }
    })
  }

  openWithdrawModal(id: number) {
    this.selectedOglasId = id;
    this.modalService.openModal('withdrawModal', 'Withdraw application', 'Are you sure you want to withdraw this application?', []);
  }

  async closeWithdrawModal() {
    await this.modalService.closeModal('withdrawModal');
  }

  async confirmWithdraw() {
    this.withdraw();
    await this.modalService.closeModal('withdrawModal');
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

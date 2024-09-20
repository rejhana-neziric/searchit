import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {CreateCvComponent} from "../cv-create/create-cv.component";
import {DatePipe, isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {NotificationToastComponent} from "../../notifications/notification-toast/notification-toast.component";
import {User} from "../../../modals/user";
import {NotificationService} from "../../../services/notification-service";
import {AuthService} from "../../../services/auth-service";
import {firstValueFrom} from "rxjs";
import {CVGetResponse, CVGetResponseCV} from "../../../endpoints/cv-endpoint/get/cv-get-response";
import {CVGetRequest} from "../../../endpoints/cv-endpoint/get/cv-get-request";
import {CVGetEndpoint} from "../../../endpoints/cv-endpoint/get/cv-get-endpoint";
import {FooterComponent} from "../../layout/footer/footer.component";
import {CvDeleteEndpoint} from "../../../endpoints/cv-endpoint/delete/cv-delete-endpoint";
import {CvUpdateStatusEndpoint} from "../../../endpoints/cv-endpoint/update-status/cv-update-status-endpoint";
import {CvUpdateStatusRequest} from "../../../endpoints/cv-endpoint/update-status/cv-update-status-request";
import {ModalService} from "../../../services/modal-service";
import {ModalComponent} from "../../notifications/modal/modal.component";
import {SharedService} from "../../../services/shared.service";
import {CvService} from "../../../services/cv.service";

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [
    NavbarComponent,
    CreateCvComponent,
    NgIf,
    RouterLink,
    DatePipe,
    FormsModule,
    NgForOf,
    NgxPaginationModule,
    NotificationToastComponent,
    FooterComponent,
    ModalComponent
  ],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.css'
})
export class CvComponent implements OnInit {

  cv: CVGetResponseCV [] = [];
  cvId: number = 1;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  total: number = 10;
  imaRezultataPretrage: boolean = this.cv?.length != 0;
  searchObject: CVGetRequest | null = null;
  selectedCV: any;
  noCV: boolean = this.cv?.length == 0;
  pretragaNaziv: string = "";
  kandidat: User = {id: "", role: "", jwt: ""}

  deleteButtons = [
    { text: 'Cancel', class: 'btn-cancel', action: () => this.closeDeleteModal() },
    { text: 'Delete', class: 'btn-danger', action: () => this.confirmDelete() }
  ];

  publishButtons = [
    { text: 'Cancel', class: 'btn-cancel', action: () => this.closePublishModal() },
    { text: 'Publish', class: 'btn-confirm', action: () => this.confirmPublish() }
  ];

  unpublishButtons = [
    { text: 'Cancel', class: 'btn-cancel', action: () => this.closeUnPublishModal() },
    { text: 'Unpublish', class: 'btn-confirm', action: () => this.confirmUnPublish() }
  ];

  constructor(private authService: AuthService,
              private modalService: ModalService,
              private sharedService: SharedService,
              private cvService: CvService,
              @Inject(PLATFORM_ID) private platformId: any) {
  }


  async ngOnInit(): Promise<void> {
    this.kandidat = this.authService.getLoggedUser();
    await this.getAll();
  }

  onSearchChange(pretraga: string) {
    this.pretragaNaziv = pretraga;
    this.getAll();
    this.renderCV();
  }

  setTotal() {
    this.total = this.sharedService.setTotal(this.cv);
  }

  pageChangeEvent($event: number) {
    this.currentPage = this.sharedService.pageChangeEvent($event, this.currentPage);
    this.setTotal();
    this.sharedService.scrollToTop();
  }

  async getAll() {
    this.searchObject = {
      kandidatId: this.kandidat.id,
      objavljen: null,
      naziv: this.pretragaNaziv
    };

    this.cv = await this.cvService.getAll(this.searchObject);
    this.imaRezultataPretrage = this.cv?.length != 0;
    this.noCV = this.cv?.length == 0;
  }

  renderCV() {
    this.imaRezultataPretrage = this.cv?.length != 0;
    this.setTotal();
    return this.cv;
  }

  openDeleteModal(cv: CVGetResponseCV) {
    this.selectedCV = cv;
    this.modalService.openModal('deleteModal', 'Confirm Delete', 'Are you sure you want to delete this item?', []);
  }

  async closeDeleteModal() {
    await this.modalService.closeModal('deleteModal');
  }

  async confirmDelete() {
    this.delete();
    await this.modalService.closeModal('deleteModal');
  }

  openPublishModal(cvid: number | undefined) {
    this.cvId = cvid ?? 1
    this.modalService.openModal('publishModal', 'Confirm Publish', 'Are you sure you want to publish this CV?', []);
  }

  async closePublishModal() {
    await this.modalService.closeModal('publishModal');
  }

  async confirmPublish() {
    this.changeStatus(true);
    await this.modalService.closeModal('publishModal');
  }

  openUnPublishModal(cvid: number | undefined) {
    this.cvId = cvid ?? 1
    this.modalService.openModal('unpublishModal', 'Confirm Unublish', 'Are you sure you want to unpublish this CV?', []);
  }

  async closeUnPublishModal() {
    await this.modalService.closeModal('unpublishModal');
  }

  async confirmUnPublish() {
    this.changeStatus(false);
    await this.modalService.closeModal('unpublishModal');
  }

  delete() {
    this.cvService.delete(this.selectedCV.id).subscribe({
      next: () => {
        this.getAll();
      },
      error: (error) => {
        console.log('Failed to delete CV:', error);
      }
    });
  }

  changeStatus(objavljen: boolean) {
    const updateRequest: CvUpdateStatusRequest = {
      id: this.cvId,
      objavljen: objavljen,
      kandidatId: this.kandidat?.id,
    }

    this.cvService.changeStatus(updateRequest).subscribe({
      next: () => {
        this.getAll();
      },
      error: (error) => {
        console.log('Status change failed: ', error);
      }
    });
  }

  protected readonly Date = Date;
}

import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";
import {CreateCvComponent} from "../create-cv/create-cv.component";
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
import {FooterComponent} from "../../footer/footer.component";
import {CvDeleteEndpoint} from "../../../endpoints/cv-endpoint/delete/cv-delete-endpoint";
import {CvUpdateStatusEndpoint} from "../../../endpoints/cv-endpoint/update-status/cv-update-status-endpoint";
import {CvUpdateStatusRequest} from "../../../endpoints/cv-endpoint/update-status/cv-update-status-request";
import {ModalService} from "../../../services/modal-service";
import {ModalComponent} from "../../modal/modal.component";



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

  constructor(private notificationService: NotificationService,
              private authService: AuthService,
              private cvGetEndpoint: CVGetEndpoint,
              private cvDeleteEndpoint: CvDeleteEndpoint,
              private cvUpdateStatusEndpoint: CvUpdateStatusEndpoint,
              private modalService: ModalService,
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

  private setTotal() {
    this.total = this.cv.length;
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
      objavljen: null,
      naziv: this.pretragaNaziv
    };

    try {
      const response = await firstValueFrom(this.cvGetEndpoint.obradi(this.searchObject));
      this.cv = response.cv.$values;
      this.imaRezultataPretrage = this.cv?.length != 0;
      this.noCV = this.cv?.length == 0;
    } catch (error) {
      console.log(error);
      this.cv = [];
    }
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
    this.cvDeleteEndpoint.obradi(this.selectedCV.id).subscribe({
      next: any => {
        this.notificationService.addNotification({message: 'Your CV has been successfully deleted.', type: 'success'});
        this.getAll();
      },
      error: error => {
        this.notificationService.addNotification({
          message: 'Sorry, there was mistake. Please try again..',
          type: 'error'
        });
      }
    })

    this.renderCV();
  }

  changeStatus(objavljen: boolean) {
    const updateRequest: CvUpdateStatusRequest = {
      id: this.cvId,
      objavljen: objavljen,
      kandidatId: this.kandidat?.id,
    }

    console.log(updateRequest)
    this.cvUpdateStatusEndpoint.obradi(updateRequest).subscribe({
      next: any => {
        if (objavljen) {
          this.notificationService.addNotification({
            message: 'Your CV has been successfully published.',
            type: 'success'
          });
        } else {
          this.notificationService.addNotification({
            message: 'Your CV has been successfully unpublished.',
            type: 'success'
          });
        }

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

  protected readonly Date = Date;
}

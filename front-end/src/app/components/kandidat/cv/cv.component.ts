import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";
import {CreateCvComponent} from "../create-cv/create-cv.component";
import {DatePipe, isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {NotificationToastComponent} from "../../notifications/notification-toast/notification-toast.component";
import {OglasGetResponseOglasi} from "../../../endpoints/oglas-endpoint/get/oglas-get-response";
import {OglasGetRequest} from "../../../endpoints/oglas-endpoint/get/oglas-get-request";
import {User} from "../../../modals/user";
import {OglasGetEndpoint} from "../../../endpoints/oglas-endpoint/get/oglas-get-endpoint";
import {
  KandidatSpaseniOglasiUpdateEndpoint
} from "../../../endpoints/kandidat-spaseni-oglasi-endpoint/update/kandidat-spaseni-oglasi-update-endpoint";
import {NotificationService} from "../../../services/notification-service";
import {AuthService} from "../../../services/auth-service";
import {firstValueFrom} from "rxjs";
import {CVGetResponse, CVGetResponseCV} from "../../../endpoints/cv-endpoint/get/cv-get-response";
import {CVGetRequest} from "../../../endpoints/cv-endpoint/get/cv-get-request";
import {CVGetEndpoint} from "../../../endpoints/cv-endpoint/get/cv-get-endpoint";
import {CvUpdateRequest} from "../../../endpoints/cv-endpoint/update/cv-update-request";
import {CVUpdateEndpoint} from "../../../endpoints/cv-endpoint/update/cv-update-endpoint";

declare var bootstrap: any;

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
    NotificationToastComponent
  ],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.css'
})
export class CvComponent implements OnInit{

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

  constructor(private notificationService: NotificationService,
              private authService: AuthService,
              private cvGetEndpoint: CVGetEndpoint,
              private cvUpdateEndpoint: CVUpdateEndpoint,
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
      kandidatId: this.kandidat.id
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
    return this.cv
  }

  confirmDelete() {
    this.delete();
    this.closeModal();
  }

  openDeleteModal() {
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('confirmDeleteModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  closeModal() {
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('confirmDeleteModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
    }
  }


  //ispraviti sa deleteEndpointom
  delete(){
    this.cv.shift();
    this.notificationService.addNotification({message: 'CV deleted.', type: 'success'});
    this.renderCV();
  }

  confirmPublish(cv: CVGetResponseCV) {
    this.selectedCV = cv;
    this.changeStatus(true);
    this.closePublishModal()
  }

  openPublishModal() {
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('confirmPublishModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  closePublishModal() {
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('confirmPublishModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
    }
  }

  confirmUnPublish(cv: CVGetResponseCV) {
    this.selectedCV = cv;
    this.changeStatus(false);
    this.closeUnPublishModal()
  }

  openUnPublishModal() {
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('confirmUnPublishModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  closeUnPublishModal() {
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('confirmUnPublishModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
    }
  }

  changeStatus(objavljen: boolean) {
    const updateRequest: CvUpdateRequest = {
      id: this.selectedCV.id,
      objavljen: objavljen,
    }

    console.log(updateRequest)
    this.cvUpdateEndpoint.obradi(updateRequest).subscribe({
      next: any => {
        if(objavljen) {

          this.notificationService.addNotification({message: 'Your CV has been successfully published.', type: 'success'});
        } else {
          this.notificationService.addNotification({message: 'Your CV has been successfully unpublished.', type: 'success'});

        }

      this.getAll();

      },
      error: error => {

      }
    })
  }

}

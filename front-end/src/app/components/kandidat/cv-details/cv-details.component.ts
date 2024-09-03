import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {DatePipe, isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {NavbarComponent} from "../../navbar/navbar.component";
import {CVGetByIdEndpoint} from "../../../endpoints/cv-endpoint/get-by-id/cv-get-by-id-endpoint";
import {CVGetByIdResponse} from "../../../endpoints/cv-endpoint/get-by-id/cv-get-by-id-response";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NotificationService} from "../../../services/notification-service";
import {CVUpdateEndpoint} from "../../../endpoints/cv-endpoint/update/cv-update-endpoint";
import {CvUpdateRequest} from "../../../endpoints/cv-endpoint/update/cv-update-request";

declare var bootstrap: any;

@Component({
  selector: 'app-cv-details',
  standalone: true,
  imports: [
    DatePipe,
    NavbarComponent,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './cv-details.component.html',
  styleUrl: './cv-details.component.css'
})
export class CvDetailsComponent implements  OnInit{

  cv: CVGetByIdResponse | null = null;
  cvId: number = 9;

  constructor(private cvGetByIdEndpoint: CVGetByIdEndpoint,
              private cvUpdateEndpoint: CVUpdateEndpoint,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId: any) {
  }

  ngOnInit(): void {
    this.cvId = this.activatedRoute.snapshot.params["id"];
    console.log(this.cvId)
    this.getCV();
  }

  getCV() {
    this.cvGetByIdEndpoint.obradi(this.cvId!).subscribe({
      next: x => {
        this.cv = x;
        console.log("cv id = " + this.cv.id);
      }
    })
  }

  changeStatus(objavljen: boolean) {
    const updateRequest: CvUpdateRequest = {
      id: this.cvId,
      objavljen: objavljen,
    }

    console.log(updateRequest)
    this.cvUpdateEndpoint.obradi(updateRequest).subscribe({
      next: any => {
        if(objavljen) {
          this.notificationService.showModalNotification(true, 'CV published', 'Your CV has been successfully published.');
        } else {
          this.notificationService.showModalNotification(true, 'CV unpublished', 'Your CV has been successfully unpublished.');
        }

        this.router.navigateByUrl('/cv');

      },
      error: error => {

      }
    })
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

  confirmPublish() {
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

  confirmUnPublish() {
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


  //promijeniti
  delete() {
    this.notificationService.showModalNotification(true, 'CV deleted', 'Your CV has been successfully deleted.');
    this.router.navigateByUrl('/cv');
  }
}

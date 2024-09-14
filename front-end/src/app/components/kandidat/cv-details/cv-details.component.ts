import {AfterViewInit, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {DatePipe, isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {NavbarComponent} from "../../navbar/navbar.component";
import {CVGetByIdEndpoint} from "../../../endpoints/cv-endpoint/get-by-id/cv-get-by-id-endpoint";
import {CVGetByIdResponse} from "../../../endpoints/cv-endpoint/get-by-id/cv-get-by-id-response";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NotificationService} from "../../../services/notification-service";
import {CVUpdateEndpoint} from "../../../endpoints/cv-endpoint/update/cv-update-endpoint";
import {CvUpdateRequest} from "../../../endpoints/cv-endpoint/update/cv-update-request";
import {firstValueFrom, take} from "rxjs";
import {User} from "../../../modals/user";
import {AuthService} from "../../../services/auth-service";
import {
  KandidatOglasUpdateRequest
} from "../../../endpoints/kandidat-oglas-endpoint/update/kandidat-oglas-update-request";
import {HttpErrorResponse} from "@angular/common/http";
import {
  KandidatOglasUpdateEndpoint
} from "../../../endpoints/kandidat-oglas-endpoint/update/kandidat-oglas-update-endpoint";
import {FooterComponent} from "../../footer/footer.component";
import {CvUpdateStatusRequest} from "../../../endpoints/cv-endpoint/update-status/cv-update-status-request";
import {CvUpdateStatusEndpoint} from "../../../endpoints/cv-endpoint/update-status/cv-update-status-endpoint";
import {NotificationToastComponent} from "../../notifications/notification-toast/notification-toast.component";
import {CvDeleteEndpoint} from "../../../endpoints/cv-endpoint/delete/cv-delete-endpoint";
import {ModalComponent} from "../../modal/modal.component";
import {CVGetResponseCV} from "../../../endpoints/cv-endpoint/get/cv-get-response";
import {ModalService} from "../../../services/modal-service";

declare var bootstrap: any;

@Component({
  selector: 'app-cv-details',
  standalone: true,
  imports: [
    DatePipe,
    NavbarComponent,
    NgForOf,
    NgIf,
    RouterLink,
    FooterComponent,
    NotificationToastComponent,
    ModalComponent
  ],
  templateUrl: './cv-details.component.html',
  styleUrl: './cv-details.component.css'
})
export class CvDetailsComponent implements OnInit {

  cv: CVGetByIdResponse | null = null;
  cvId: number = 9;
  loggedUser: User | null = null;
  status: string = ""
  kandidatOglas: any
  objavljen: boolean = false;

  deleteButtons = [
    {text: 'Cancel', class: 'btn-cancel', action: () => this.closeDeleteModal()},
    {text: 'Delete', class: 'btn-danger', action: () => this.confirmDelete()}
  ];

  publishButtons = [
    {text: 'Cancel', class: 'btn-cancel', action: () => this.closePublishModal()},
    {text: 'Publish', class: 'btn-confirm', action: () => this.confirmPublish()}
  ];

  unpublishButtons = [
    {text: 'Cancel', class: 'btn-cancel', action: () => this.closeUnPublishModal()},
    {text: 'Unpublish', class: 'btn-confirm', action: () => this.confirmUnPublish()}
  ];

  acceptButtons = [
    {text: 'Cancel', class: 'btn-cancel', action: () => this.closeAcceptModal()},
    {text: 'Accept', class: 'btn-confirm', action: () => this.confirmAccept()}
  ];

  constructor(private cvGetByIdEndpoint: CVGetByIdEndpoint,
              private cvDeleteEndpoint: CvDeleteEndpoint,
              private cvUpdateStatusEndpoint: CvUpdateStatusEndpoint,
              private kandidatOglasUpdateEndpoint: KandidatOglasUpdateEndpoint,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService,
              private modalService: ModalService,
              private router: Router,
              private authService: AuthService,
              @Inject(PLATFORM_ID) private platformId: any) {
  }

  async ngOnInit(): Promise<void> {
    this.cvId = this.activatedRoute.snapshot.params["id"];

    try {
      const user = await firstValueFrom(this.authService.user$.pipe(take(1)));
      if (user) {
        this.loggedUser = user;
      }
    } catch (err) {
      console.error('Error fetching user:', err);
    }

    this.kandidatOglas = history.state.kandidatOglas;
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
    const updateRequest: CvUpdateStatusRequest = {
      id: this.cvId,
      objavljen: objavljen,
      kandidatId: this.loggedUser?.id!,
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

        this.objavljen = objavljen;
      },
      error: error => {
        this.notificationService.addNotification({
          message: 'Sorry, there was mistake. Please try again..',
          type: 'error'
        });
      }
    })
  }

  getObjavljen(cv: CVGetByIdResponse | null) {
    this.objavljen = cv?.objavljen ?? false;
  }

  openDeleteModal() {
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
    this.cvId = cvid ?? 1;
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
    this.cvId = cvid ?? 1;
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
    this.cvDeleteEndpoint.obradi(this.cv?.id!).subscribe({
      next: any => {
        this.notificationService.showModalNotification(true, 'CV deleted', 'Your CV has been successfully deleted.');
        this.router.navigateByUrl('/cv');
      },
      error: error => {
        this.notificationService.addNotification({
          message: 'Sorry, there was mistake. Please try again..',
          type: 'error'
        });
      }
    })
  }

  accept() {
    var request: KandidatOglasUpdateRequest = {
      id: this.kandidatOglas.id,
      kompanijaId: this.kandidatOglas.kompanijaId,
      kandidatId: this.kandidatOglas.kandidatId,
      status: 'Accepted',
      spasen: this.kandidatOglas.spasen
    };


    this.kandidatOglasUpdateEndpoint.obradi(request).subscribe({
      next: any => {
        this.notificationService.showModalNotification(true, 'Applicant accepted', 'Applicant has been successfully accepted.');
        this.router.navigateByUrl('/applicants');

      },
      error: error => {
        this.notificationService.addNotification({
          message: 'Sorry, there was mistake. Please try again..',
          type: 'error'
        });
      }
    })
  }

  openAcceptModal() {
    this.modalService.openModal('acceptModal', 'Confirm Acception', 'Are you sure you want to accept this applicant?', []);
  }

  async closeAcceptModal() {
    await this.modalService.closeModal('acceptModal');
  }

  async confirmAccept() {
    this.accept();
    await this.modalService.closeModal('acceptModal');
  }

  edit(cvid: number) {
    this.router.navigateByUrl(`/cv-create/${encodeURIComponent(cvid)}`);
  }
}

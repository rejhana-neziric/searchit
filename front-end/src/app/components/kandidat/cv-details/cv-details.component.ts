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
    NotificationToastComponent
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

  constructor(private cvGetByIdEndpoint: CVGetByIdEndpoint,
              private cvDeleteEndpoint: CvDeleteEndpoint,
              private cvUpdateStatusEndpoint: CvUpdateStatusEndpoint,
              private kandidatOglasUpdateEndpoint: KandidatOglasUpdateEndpoint,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService,
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
    console.log(this.kandidatOglas); // Use the received data as nee

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

  openPublishModal(cvid: number | undefined) {
    this.cvId = cvid ?? 1;
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

  openUnPublishModal(cvid: number | undefined) {
    this.cvId = cvid ?? 1;
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

  confirmAccept() {
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

    this.closeAcceptModal();
  }

  openAcceptModal() {
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('confirmAccept');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  closeAcceptModal() {
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('confirmAccept');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
    }
  }

  edit(cvid: number) {
    this.router.navigateByUrl(`/cv-create/${encodeURIComponent(cvid)}`);
  }
}

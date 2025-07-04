import {AfterViewInit, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {DatePipe, isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {CVGetByIdEndpoint} from "../../../endpoints/cv-endpoint/get-by-id/cv-get-by-id-endpoint";
import {CVGetByIdResponse} from "../../../endpoints/cv-endpoint/get-by-id/cv-get-by-id-response";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NotificationService} from "../../../services/notification-service";
import {firstValueFrom, take} from "rxjs";
import {User} from "../../../modals/user";
import {AuthService} from "../../../services/auth-service";
import {
  KandidatOglasUpdateRequest
} from "../../../endpoints/kandidat-oglas-endpoint/update/kandidat-oglas-update-request";
import {
  KandidatOglasUpdateEndpoint
} from "../../../endpoints/kandidat-oglas-endpoint/update/kandidat-oglas-update-endpoint";
import {FooterComponent} from "../../layout/footer/footer.component";
import {CvUpdateStatusRequest} from "../../../endpoints/cv-endpoint/update-status/cv-update-status-request";
import {CvUpdateStatusEndpoint} from "../../../endpoints/cv-endpoint/update-status/cv-update-status-endpoint";
import {NotificationToastComponent} from "../../notifications/notification-toast/notification-toast.component";
import {CvDeleteEndpoint} from "../../../endpoints/cv-endpoint/delete/cv-delete-endpoint";
import {ModalComponent} from "../../notifications/modal/modal.component";
import {ModalService} from "../../../services/modal-service";
import {CvService} from "../../../services/cv.service";
import {KompanijaService} from "../../../services/kompanija.service";
import {TranslatePipe} from "@ngx-translate/core";


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
    ModalComponent,
    TranslatePipe
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
              private cvService: CvService,
              private kompanijaService: KompanijaService,
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

    this.cvService.changeStatus(updateRequest).subscribe({
      next: () => {
        this.objavljen = objavljen;
      },
      error: (error) => {
        console.log('Status change failed: ', error);
      }
    });
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
    this.cvService.delete(this.cv?.id!).subscribe({
      next: () => {
        this.router.navigateByUrl('/cv');
      },
      error: (error) => {
        console.log('Failed to delete CV:', error);
      }
    });
  }

  accept() {
    const request: KandidatOglasUpdateRequest = {
      id: this.kandidatOglas.id,
      kompanijaId: this.kandidatOglas.kompanijaId,
      kandidatId: this.kandidatOglas.kandidatId,
      status: 'Accepted',
      spasen: this.kandidatOglas.spasen
    };

    this.kompanijaService.acceptApplicant(request).subscribe({
      next: () => {
        this.router.navigateByUrl('/applicants');  // Navigate on success
      },
      error: (error) => {
        console.log('Failed to accept applicant:', error);
      }
    });
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

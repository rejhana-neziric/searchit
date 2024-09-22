import {Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {DatePipe, isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {CVDodajEndpoint} from "../../../endpoints/cv-endpoint/dodaj/cv-dodaj-endpoint";
import {NotificationService} from "../../../services/notification-service";
import {CVGetByIdEndpoint} from "../../../endpoints/cv-endpoint/get-by-id/cv-get-by-id-endpoint";
import {FooterComponent} from "../../layout/footer/footer.component";
import {CVUpdateEndpoint} from "../../../endpoints/cv-endpoint/update/cv-update-endpoint";
import {ModalComponent} from "../../notifications/modal/modal.component";
import {ModalService} from "../../../services/modal-service";

@Component({
  selector: 'app-cv-preview',
  standalone: true,
  imports: [
    NavbarComponent,
    NgIf,
    NgForOf,
    NgxPaginationModule,
    DatePipe,
    RouterLink,
    FooterComponent,
    ModalComponent
  ],
  templateUrl: './cv-preview.component.html',
  styleUrl: './cv-preview.component.css'
})
export class CvPreviewComponent implements OnInit {

  cv: any;
  cvId: number = 9;
  cvPreview: boolean = true;
  cvEditId: string | null = null;
  edit: boolean = false;

  createCVButtons = [
    {text: 'Cancel', class: 'btn-cancel', action: () => this.closeCreateCVModal()},
    {text: 'Save as draft', class: 'btn-confirm w-auto', action: () => this.createCV(false)},
    {text: 'Publish', class: 'btn-confirm', action: () => this.createCV(true)},
  ];

  constructor(private router: Router,
              @Inject(PLATFORM_ID) private platformId: any,
              private cvDodajEndpoint: CVDodajEndpoint,
              private cvGetByIdEndpoint: CVGetByIdEndpoint,
              private cvUpdateEndpoint: CVUpdateEndpoint,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private modalService: ModalService) {

  }

  ngOnInit() {
    this.cv = history.state.data;

    if (this.cv == undefined) {
      this.cvPreview = false;
      this.getCV();
    }

    this.route.paramMap.subscribe(params => {
      this.cvEditId = params.get('id');
    });

    if (this.cvEditId != null) {
      this.edit = true;
    }
  }

  openCreateCVModal() {
    this.modalService.openModal('createCVModal', 'Publish CV', 'Are you sure you want to publish CV?', []);/**/
  }

  async closeCreateCVModal() {
    await this.modalService.closeModal('createCVModal');
  }

  getCV() {
    this.cvGetByIdEndpoint.obradi(this.cvId!).subscribe({
      next: x => {
        this.cv = x;
      }
    })
  }

  createCV(objavljen: boolean) {
    this.cv.objavljen = objavljen;
    this.closeCreateCVModal();

    this.cvDodajEndpoint.obradi(this.cv!).subscribe({
      next: response => {
        this.notificationService.showModalNotification(true, 'CV created', 'Your CV has been successfully created.');
        this.router.navigateByUrl('/cv');
        localStorage.removeItem('cvData');
      },
      error: error => {
        this.notificationService.addNotification({message: `Error: ${error.message}`, type: 'error'});
      }
    })
  }

  save() {
    this.cv.id = Number(this.cvEditId);

    this.cvUpdateEndpoint.obradi(this.cv!).subscribe({
      next: any => {
        this.notificationService.addNotification({message: 'Your CV has been successfully edited.', type: 'success'});
        this.router.navigateByUrl('/cv');
        localStorage.removeItem('cvData');
      },
      error: error => {
        this.notificationService.addNotification({message: error.message, type: 'error'});
      }
    })
  }

  protected readonly Number = Number;

  cancel() {
    localStorage.removeItem('cvData');
    this.router.navigateByUrl('/cv');
  }
}

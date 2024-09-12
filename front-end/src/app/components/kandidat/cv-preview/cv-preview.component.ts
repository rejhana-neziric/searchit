import {Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";
import {CvDodajRequest} from "../../../endpoints/cv-endpoint/dodaj/cv-dodaj-request";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {DatePipe, isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {CVDodajEndpoint} from "../../../endpoints/cv-endpoint/dodaj/cv-dodaj-endpoint";
import {NotificationService} from "../../../services/notification-service";
import {CVGetByIdEndpoint} from "../../../endpoints/cv-endpoint/get-by-id/cv-get-by-id-endpoint";
import {FooterComponent} from "../../footer/footer.component";
import {CVUpdateEndpoint} from "../../../endpoints/cv-endpoint/update/cv-update-endpoint";

declare var bootstrap: any;

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
    FooterComponent
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

  constructor(private router: Router,
              @Inject(PLATFORM_ID) private platformId: any,
              private cvDodajEndpoint: CVDodajEndpoint,
              private cvGetByIdEndpoint: CVGetByIdEndpoint,
              private cvUpdateEndpoint: CVUpdateEndpoint,
              private route: ActivatedRoute,
              private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.cv = history.state.data;
    console.log(this.cv); // Use the received data as nee

    if(this.cv == undefined) {
      this.cvPreview = false;
      this.getCV();
    }

    this.route.paramMap.subscribe(params => {
      this.cvEditId = params.get('id');
    });

    if(this.cvEditId != null) {
      this.edit = true;
    }
  }

  openModal() {
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('confirmSaveModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  closeModal() {
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('confirmSaveModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }
    }
  }


  getCV() {
    this.cvGetByIdEndpoint.obradi(this.cvId!).subscribe({
      next: x => {
        this.cv = x;
        console.log("cv id = " + this.cv.id);
      }
    })
  }

  createCV(objavljen: boolean) {
    this.cv.objavljen = objavljen;

    this.cvDodajEndpoint.obradi(this.cv!).subscribe({
      next: response => {
        this.notificationService.showModalNotification(true, 'CV created', 'Your CV has been successfully created.');
        this.router.navigateByUrl('/cv');
        localStorage.removeItem('cvData');
        this.closeModal();
      },
      error: error => {
        this.closeModal();
        this.notificationService.addNotification({message: `Error: ${error.message}`, type: 'error'});
      }
    })
  }

  save() {

    this.cv.id = Number(this.cvEditId);

    console.log('save')

    console.log(this.cv.id)

    this.cvUpdateEndpoint.obradi(this.cv!).subscribe({
      next: any => {
        this.notificationService.addNotification({message: 'Your CV has been successfully edited.', type: 'success'});
        //this.closeSaveModal()
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

import {Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";
import {CvDodajRequest} from "../../../endpoints/cv-endpoint/dodaj/cv-dodaj-request";
import {Router, RouterLink} from "@angular/router";
import {DatePipe, isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {CVDodajEndpoint} from "../../../endpoints/cv-endpoint/dodaj/cv-dodaj-endpoint";
import {NotificationService} from "../../../services/notification-service";

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
    RouterLink
  ],
  templateUrl: './cv-preview.component.html',
  styleUrl: './cv-preview.component.css'
})
export class CvPreviewComponent implements OnInit {

  cv: any;

  constructor(private router: Router,
              @Inject(PLATFORM_ID) private platformId: any,
              private cvDodajEndpoint: CVDodajEndpoint,
              private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.cv = history.state.data;
    console.log(this.cv); // Use the received data as nee
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

  createCV(objavljen: boolean) {
    this.cv.objavljen = objavljen;

    this.cvDodajEndpoint.obradi(this.cv!).subscribe({
      next: response => {
        this.notificationService.showModalNotification(true, 'CV created', 'Your CV has been successfully created.');
        this.router.navigateByUrl('/cv');
        localStorage.removeItem('cvData');
      },
      error: error => {
        this.closeModal();
        this.notificationService.addNotification({message: `Error: ${error.message}`, type: 'error'});
      }
    })
  }
}

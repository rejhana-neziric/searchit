import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {DatePipe, isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {NgxPaginationModule} from "ngx-pagination";
import {NotificationToastComponent} from "../../notifications/notification-toast/notification-toast.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CVGetResponseCV} from "../../../endpoints/cv-endpoint/get/cv-get-response";
import {CVGetRequest} from "../../../endpoints/cv-endpoint/get/cv-get-request";
import {User} from "../../../modals/user";
import {NotificationService} from "../../../services/notification-service";
import {AuthService} from "../../../services/auth-service";
import {CVGetEndpoint} from "../../../endpoints/cv-endpoint/get/cv-get-endpoint";
import {CVUpdateEndpoint} from "../../../endpoints/cv-endpoint/update/cv-update-endpoint";
import {Router, RouterLink} from "@angular/router";
import {CVGetByIdEndpoint} from "../../../endpoints/cv-endpoint/get-by-id/cv-get-by-id-endpoint";
import {CVGetByIdResponse} from "../../../endpoints/cv-endpoint/get-by-id/cv-get-by-id-response";
import {FooterComponent} from "../../layout/footer/footer.component";
import {CvService} from "../../../services/cv.service";
import {KandidatGetByIdResponse} from "../../../endpoints/kandidat-endpoint/get-by-id/kandidat-get-by-id-response";
import {
  KandidatOglasGetResponseKandidatOglas
} from "../../../endpoints/kandidat-oglas-endpoint/get/kandidat-oglas-get-response";
import {
  KandidatOglasUpdateRequest
} from "../../../endpoints/kandidat-oglas-endpoint/update/kandidat-oglas-update-request";
import {firstValueFrom} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {KandidatGetByIdEndpoint} from "../../../endpoints/kandidat-endpoint/get-by-id/kandidat-get-by-id-endpoint";
import {KandidatOglasGetEndpoint} from "../../../endpoints/kandidat-oglas-endpoint/get/kandidat-oglas-get-endpoint";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-cv-published',
  standalone: true,
  imports: [
    DatePipe,
    NavbarComponent,
    NgForOf,
    NgIf,
    NgxPaginationModule,
    NotificationToastComponent,
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
    FooterComponent,
    TranslatePipe
  ],
  templateUrl: './cv-published.component.html',
  styleUrl: './cv-published.component.css'
})
export class CvPublishedComponent implements OnInit {
  cv: CVGetResponseCV [] = [];
  cvId: number = 1;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  total: number = 10;
  imaRezultataPretrage: boolean = this.cv?.length != 0;
  searchObject: CVGetRequest | null = null;
  selectedCV: CVGetResponseCV | null = null;
  CVZaPrikaz: CVGetByIdResponse | null = null;
  selectedCVId: number = 0;
  noCV: boolean = this.cv?.length == 0;
  pretragaNaziv: string = "";
  user: User = {id: "", role: "", jwt: ""}
  noNextElement: boolean = false;
  noPreviousElement: boolean = true;
  filterList: any[] = []
  selectedFilter: number = 0;
  selectedSort: any = "0";
  kandidat:KandidatGetByIdResponse | null = null;
  kandidatOglas: KandidatOglasGetResponseKandidatOglas | null = null;
  constructor(private notificationService: NotificationService,
              private authService: AuthService,
              private cvService: CvService,
              private cvGetEndpoint: CVGetEndpoint,
              private cvGetByIdEndpoint: CVGetByIdEndpoint,
              private cvUpdateEndpoint: CVUpdateEndpoint,
              private kandidatGetByIdEndpoint: KandidatGetByIdEndpoint,
              private kandidatOglasGetEndpoint: KandidatOglasGetEndpoint,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId: any) {
  }


  async ngOnInit(): Promise<void> {
    this.user = this.authService.getLoggedUser();
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

  pageChangeEvent($event: number, isNewPage: boolean) {
    this.currentPage = $event;
    this.setTotal();
    if (isNewPage) {
      this.selektujPrviCV();
    }
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
      kandidatId: null,
      objavljen: true,
      naziv: null
    };

    this.cv = await this.cvService.getAll(this.searchObject);
    this.imaRezultataPretrage = this.cv?.length != 0;
    this.noCV = this.cv?.length == 0;
    this.selektujPrviCV();
  }

  getCurrentPageItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.cv.slice(startIndex, endIndex);
  }

  selektujPrviCV() {
    const currentPosts = this.getCurrentPageItems();

    if (currentPosts != undefined && currentPosts.length > 0) {
      //this.cvZaPrikaz = currentPosts[0];
      this.selectedCV = currentPosts[0];
      this.selectedCVId = currentPosts[0].id;
      this.currentElementIndex = this.cv.findIndex(item => item.id == this.selectedCVId);
    }

    this.prikazDetalja(this.selectedCV!);
  }

  renderCV() {

    if (this.pretragaNaziv == "") {
      return this.cv;
    }

    return this.cv.filter(cv =>
      cv.ime.toLowerCase().includes(this.pretragaNaziv) ||
      cv.prezime.toLowerCase().includes(this.pretragaNaziv) ||
      cv.zvanje.toLowerCase().includes(this.pretragaNaziv)
    );
  }

  changeStatus(objavljen: boolean) {
    /* const updateRequest: CvUpdateRequest = {
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
     })*/
  }

  prikazDetalja(cv: CVGetResponseCV | null) {
    if (cv != null) {
      this.selectedCVId = cv.id;
      this.selectedCV = cv;
      this.currentElementIndex = this.cv.findIndex(item => item.id == this.selectedCVId) - 1;
      //this.currentElementIndex == -1 ? this.noPreviousElement = true : this.noPreviousElement = false;
      this.getCV();
    }
  }

  getCV() {
    this.cvGetByIdEndpoint.obradi(this.selectedCVId).subscribe({
      next: x => {
        this.CVZaPrikaz = x;
        ///this.odabaraniOglasId = x?.id;
      }
    })
  }


  currentElementIndex = 0;
  //nextElement = this.getNextElement(this.currentElementIndex);
  //previousElement = this.getPreviousElement(this.currentElementIndex);

  ucitajSljedecuKompaniju() {

  }

  ucitajPrethodnuKompaniju() {

  }

  contact() {

    const data = {
      ime: this.selectedCV?.ime,
      prezime: this.selectedCV?.prezime
    }

    localStorage.setItem('chat', JSON.stringify(data));

    this.router.navigate(['/chat/'], {
      state: {chat: data}
    });
  }
  sortAscending: boolean = true; // Default sorting order

  sortCVs() {
    this.cv.sort((a, b) => {
      let comparison = 0;

      switch (this.selectedSort) {
        case "1":
          comparison = new Date(a.datumModificiranja).getTime() - new Date(b.datumModificiranja).getTime();
          break;
        case "2":
          comparison = a.ime.localeCompare(b.ime);
          break;
        case "3":
          comparison = (a.grad || '').localeCompare(b.grad || '');
          break;
      }

      return this.sortAscending ? comparison : -comparison;
    });
  }

  toggleSortOrder() {
    this.sortAscending = !this.sortAscending;
    this.onSortChange();
  }

  onSortChange() {
    this.sortCVs();
    this.setTotal();
    this.selektujPrviCV();
  }

  // async save(kandidatOglas: KandidatOglasGetResponseKandidatOglas, spasen: boolean) {
  //   var request: KandidatOglasUpdateRequest = {
  //     id: kandidatOglas.id,
  //     kompanijaId: this.user.id,
  //     kandidatId: kandidatOglas.kandidatId,
  //     status: null,
  //     spasen: spasen
  //   };
  //
  //   try {
  //     const data = await firstValueFrom(this.kandidatOglasUpdateEndpoint.obradi(request));
  //     if(spasen) {
  //       this.notificationService.addNotification({message: 'Applicant saved.', type: 'success'});
  //     } else {
  //       this.notificationService.addNotification({message: 'Applicant removed.', type: 'success'});
  //     }
  //
  //   } catch (error) {
  //     if (error instanceof HttpErrorResponse) {
  //       this.notificationService.addNotification({message: `Error: ${error.message}`, type: 'error'});
  //     } else {
  //       this.notificationService.addNotification({message: 'An unexpected error occurred.', type: 'error'});
  //     }
  //   }
  //
  //   await this.getAll();
  //
  //   this.sortCVs();
  // }
  promijeniSpasen(cv: CVGetResponseCV) {
    console.log(cv.korisnikId);
    console.log(cv.id);
    this.kandidatGetByIdEndpoint.obradi(cv.id.toString()).subscribe({
      next:x =>{
        this.kandidat = x;
        console.log(x);
      }
    });

   // KandidatGetByIdResponse
   //  if (!cv.spasen) {
   //    this.save(cv, true);
   //  }
   //  else {
   //    this.save(cv, false);
   //  }
  }
}

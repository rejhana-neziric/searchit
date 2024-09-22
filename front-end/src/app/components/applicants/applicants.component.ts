import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../layout/navbar/navbar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {NotificationToastComponent} from "../notifications/notification-toast/notification-toast.component";
import {SortParametar} from "../../modals/SortParametar";
import {User} from "../../modals/user";
import {firstValueFrom} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../services/auth-service";
import {
  KandidatOglasGetResponseKandidatOglas
} from "../../endpoints/kandidat-oglas-endpoint/get/kandidat-oglas-get-response";
import {KandidatOglasGetRequest} from "../../endpoints/kandidat-oglas-endpoint/get/kandidat-oglas-get-request";
import {KandidatOglasGetEndpoint} from "../../endpoints/kandidat-oglas-endpoint/get/kandidat-oglas-get-endpoint";
import {Router, RouterLink} from "@angular/router";
import {CVGetByIdResponse} from "../../endpoints/cv-endpoint/get-by-id/cv-get-by-id-response";
import {CVGetByIdEndpoint} from "../../endpoints/cv-endpoint/get-by-id/cv-get-by-id-endpoint";
import {NotificationService} from "../../services/notification-service";
import {
  KandidatOglasUpdateEndpoint
} from "../../endpoints/kandidat-oglas-endpoint/update/kandidat-oglas-update-endpoint";
import {
  KandidatOglasUpdateRequest
} from "../../endpoints/kandidat-oglas-endpoint/update/kandidat-oglas-update-request";
import {FooterComponent} from "../layout/footer/footer.component";
import {OglasGetEndpoint} from "../../endpoints/oglas-endpoint/get/oglas-get-endpoint";
import {OglasGetRequest} from "../../endpoints/oglas-endpoint/get/oglas-get-request";
import {OglasGetResponseOglasi} from "../../endpoints/oglas-endpoint/get/oglas-get-response";
import {ModalComponent} from "../notifications/modal/modal.component";
import {ModalService} from "../../services/modal-service";

@Component({
  selector: 'app-applicants',
  standalone: true,
  imports: [
    NavbarComponent,
    FormsModule,
    NgForOf,
    NgIf,
    NgxPaginationModule,
    NotificationToastComponent,
    ReactiveFormsModule,
    RouterLink,
    DatePipe,
    FooterComponent,
    ModalComponent
  ],
  templateUrl: './applicants.component.html',
  styleUrl: './applicants.component.css'
})
export class ApplicantsComponent implements OnInit{

  kandidati: KandidatOglasGetResponseKandidatOglas [] = [];
  filterList: any[] = []
  selectedFilter: number = 0;
  pretragaNaziv: string = "";
  imaRezultataPretrage: boolean = true;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  total: number = 10;
  cvZaPrikaz: CVGetByIdResponse |  null = null;
  searchObject: KandidatOglasGetRequest | null = null
  odabraniZaPrikazCVId: number = 0;
  selektovaniKandidatCV: KandidatOglasGetResponseKandidatOglas | undefined = undefined;
  sortParametri: SortParametar[] | undefined = undefined
  noNextElement: boolean = false;
  noPreviousElement: boolean = true;
  user: User = {id: "", role: "", jwt: ""}
  status: string | null = null;
  filter: string [] = [];

  currentElementIndex = 0;
  nextElement = this.getNextElement(this.currentElementIndex);
  previousElement = this.getPreviousElement(this.currentElementIndex);

  constructor(private authService: AuthService,
              private kandidatOglasGetEndpoint: KandidatOglasGetEndpoint,
              private notificationService: NotificationService,
              private kandidatOglasUpdateEndpoint: KandidatOglasUpdateEndpoint,
              private oglasGetEndpoint: OglasGetEndpoint,
              private cvGetByIdEndpoint: CVGetByIdEndpoint,
              private modalService: ModalService,
              private router: Router) {
  }

/*  async ngOnInit(): Promise<void> {
    this.sortParametri = [];
    this.user = this.authService.getLoggedUser();
    await this.getAll();
    this.setTotal();

    this.selektovaniKandidatCV = this.kandidati[0];
    this.odabraniZaPrikazCVId =  this.kandidati[0].id;

    this.selektujPrviKandidatCV()

  }*/


  async ngOnInit() {
    this.sortParametri = [];
    this.user = this.authService.getLoggedUser();
    await this.getAll();
    await this.getFilterList();
    this.setTotal();
  }

  get filteredApplicants() {
    if (!this.selectedFilter) {
      return this.kandidati;
    }

    return this.kandidati.filter(applicant =>
      applicant.oglasId === this.selectedFilter
    );
  }


  private setTotal() {
    this.total = this.kandidati.length;
  }

  pageChangeEvent($event: number, isNewPage: boolean) {
    this.currentPage = $event;
    this.setTotal();
    if (isNewPage) {
      this.selektujPrviKandidatCV();
    }
    this.scrollToTop();
  }

  getCurrentPageItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.kandidati.slice(startIndex, endIndex);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  getNumberOfElementsOnCurrentPage(): number {
    return this.getCurrentPageItems().length;
  }

  async getAll() {
    this.searchObject = {
      kandidatId: null,
      kompanijaId: this.user.id,
      pretragaNaziv: this.pretragaNaziv,
      spasen: null,
      status: null,
      otvoren: null
    };


    try {
      const response = await firstValueFrom(this.kandidatOglasGetEndpoint.obradi(this.searchObject));
      this.kandidati = response.kandidatOglasi.$values;
      this.imaRezultataPretrage = this.kandidati?.length != 0;

      /*this.filterList = this.kandidati.map(applicant => {
        return {
          oglasId: applicant.oglasId,
          nazivPozicije: applicant.nazivPozicije,
          otvoren: applicant.otvoren
        };
      });*/

    } catch (error) {
      this.kandidati = [];
    }

    this.selektujPrviKandidatCV();
  }


  async getFilterList(){

      const request: OglasGetRequest = {
        iskustvo: undefined,
        lokacija: undefined,
        minimumGodinaIskustva: undefined,
        naziv: undefined,
        tipPosla: undefined,
        sortParametri: undefined,
        kandidatId: undefined!,
        otvoren: undefined,
        objavljen: true,
        kompanijaId: this.user.id
      };

      try {
        const response = await firstValueFrom(this.oglasGetEndpoint.obradi(request));
        //this.oglasi = response.oglasi.$values;

        this.filterList = response.oglasi.$values.map(oglas => {
          return {
            oglasId: oglas.id,
            nazivPozicije: oglas.nazivPozicije,
            otvoren: this.razlikaDatuma(oglas) < 0 ? 'Closed' : 'Opened'
          };
        });


      } catch (error) {
        console.log(error);

      }
  }

  razlikaDatuma(oglas: OglasGetResponseOglasi) {
    let danasnjiDatum = new Date();
    let datum = new Date(oglas?.rokPrijave);
    let dani = Math.floor((datum.getTime() - danasnjiDatum.getTime()) / 1000 / 60 / 60 / 24);
    return dani;
  }


  filtriraneKompanije() {
    this.imaRezultataPretrage = this.kandidati?.length != 0;
    this.setTotal();

    if (this.selectedFilter == 0) {
      return this.kandidati;
    }


    return this.kandidati.filter(applicant =>
      applicant.oglasId == this.selectedFilter
    );

  }


  prikazDetalja(kandidatCV :KandidatOglasGetResponseKandidatOglas | null) {

    if (kandidatCV != null) {
      this.selektovaniKandidatCV = kandidatCV;
      this.odabraniZaPrikazCVId = kandidatCV.cvId;

      console.log(this.odabraniZaPrikazCVId)
      //this.cvZaPrikaz!.id = kandidatCV.cvId;
      //this.kandidatCVZaPrikaz = kompanija;
      this.currentElementIndex = this.kandidati.findIndex(item => item.id == kandidatCV.id) - 1;
      this.currentElementIndex == -1 ? this.noPreviousElement = true : this.noPreviousElement = false;
      this.getOdabraniCV();
      //this.selektovaniKandidatCV = this.kandidati.find(x => x.cvId === id);
    }


  }

  getOdabraniCV() {
    console.log(this.odabraniZaPrikazCVId)

    this.cvGetByIdEndpoint.obradi(this.odabraniZaPrikazCVId).subscribe({
      next: x => {
        this.cvZaPrikaz = x;
        console.log(this.cvZaPrikaz)
      }
    })
  }

  selektujPrviKandidatCV() {
    const currentPosts = this.getCurrentPageItems();

    if (currentPosts != undefined && currentPosts.length > 0) {
      //this.cvZaPrikaz = currentPosts[0];
      this.selektovaniKandidatCV = currentPosts[0];
      this.odabraniZaPrikazCVId = currentPosts[0].cvId;
      this.currentElementIndex = this.kandidati.findIndex(item => item.id == this.odabraniZaPrikazCVId);
    }

    this.prikazDetalja(this.selektovaniKandidatCV!);
  }



  getNextElement(currentIndex: number) {
    if (currentIndex >= 0 && currentIndex < this.kandidati.length - 1) {
      return this.kandidati[currentIndex + 1];
    } else {
      return null;
    }
  }

  getPreviousElement(currentIndex: number) {
    if (currentIndex + 2 >= 0 && currentIndex < this.kandidati.length - 1) {
      return this.kandidati[currentIndex];
    } else {
      return null;
    }
  }

  ucitajSljedecuKompaniju() {
    /*const nextIndex = this.currentElementIndex + 1;

    if (nextIndex < this.kandidati.length - 1) {
      this.currentElementIndex = nextIndex;
      this.nextElement = this.getNextElement(this.currentElementIndex);

      if (this.mod(this.currentElementIndex, this.getNumberOfElementsOnCurrentPage()) + 2 - (this.itemsPerPage - this.getNumberOfElementsOnCurrentPage()) > this.getNumberOfElementsOnCurrentPage())
        this.pageChangeEvent(this.currentPage + 1, true);

      nextIndex + 1 == this.kandidati.length - 1 ? this.noNextElement = true : this.noNextElement = false;
      this.prikazDetalja(this.nextElement);
      this.noPreviousElement = false;
    } else {
      this.noNextElement = true;
      this.noPreviousElement = false;
    }*/
  }

  ucitajPrethodnuKompaniju() {
   /* const previousIndex = this.currentElementIndex;

    if (previousIndex >= 0) {
      this.previousElement = this.getPreviousElement(this.currentElementIndex);
      this.prikazDetalja(this.previousElement);

      if (this.mod(previousIndex + 1 - (this.itemsPerPage - this.getNumberOfElementsOnCurrentPage()), this.getNumberOfElementsOnCurrentPage()) == 0 && previousIndex != 0)
        this.pageChangeEvent(this.currentPage - 1, false);

      previousIndex == 0 ? this.noPreviousElement = true : this.noPreviousElement = false;
      this.noNextElement = false;
    } else {
      this.noPreviousElement = true;
      this.noNextElement = false;
    }*/
  }

  mod(a: number, b: number): number {
    return a % b;
  }

  onSearchChange(pretraga: string) {
    this.pretragaNaziv = pretraga;
    console.log(this.pretragaNaziv);
    this.getAll();
  }

  dodajFilter<T>(lista: T[], item: T): T[] {
    if (lista.includes(item)) {
      return lista.filter(x => x != item);
    } else
      return [...lista, item];
  }



  sortirajPoKompaniji() {
    this.dodajSortiranje("Naziv", "asc");
  }

  promijeniSortiranjeZaOtvorenePozicije() {
   /* this.isNumberOfOpenPositionsAscending ? this.isNumberOfOpenPositionsAscending = false : this.isNumberOfOpenPositionsAscending = true;
    this.sortParametri = this.sortParametri?.filter(parametar => parametar.naziv != "BrojOtvorenihPozicija");
    this.dodajSortiranjePoOtvorenimPozicijama();*/
  }

  sortirajPoOtvorenimPozicijama() {
   /* if (this.isNumberOfOpenPositions) {
      this.isNumberOfOpenPositions = false;
      this.isNumberOfOpenPositionsAscending = false;
    } else {
      this.isNumberOfOpenPositions = true;
      this.isNumberOfOpenPositionsAscending = true;
    }

    this.dodajSortiranjePoOtvorenimPozicijama();*/
  }

  private dodajSortiranjePoOtvorenimPozicijama() {
    /*var vrstaRedoslijeda = "";
    this.isNumberOfOpenPositionsAscending ? vrstaRedoslijeda = "asc" : vrstaRedoslijeda = "desc";
    this.dodajSortiranje("BrojOtvorenihPozicija", vrstaRedoslijeda);*/
  }

  dodajSortiranje(naziv: string, redoslijed: string) {
    var postoji = this.sortParametri?.some(parametar => parametar.naziv == naziv);

    if (postoji) {
      this.sortParametri = this.sortParametri?.filter(parametar => parametar.naziv != naziv);
    } else {
      this.sortParametri?.push(new SortParametar(naziv, redoslijed));
    }

    this.getAll();
  }


  async save(kandidatOglas: KandidatOglasGetResponseKandidatOglas, spasen: boolean) {
    var request: KandidatOglasUpdateRequest = {
      id: kandidatOglas.id,
      kompanijaId: this.user.id,
      kandidatId: kandidatOglas.kandidatId,
      status: null,
      spasen: spasen
    };

    try {
      const data = await firstValueFrom(this.kandidatOglasUpdateEndpoint.obradi(request));
      if(spasen) {
        this.notificationService.addNotification({message: 'Applicant saved.', type: 'success'});
      } else {
        this.notificationService.addNotification({message: 'Applicant removed.', type: 'success'});
      }

    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        this.notificationService.addNotification({message: `Error: ${error.message}`, type: 'error'});
      } else {
        this.notificationService.addNotification({message: 'An unexpected error occurred.', type: 'error'});
      }
    }

    await this.getAll();

    this.filtriraneKompanije();
  }

  promijeniSpasen(kandidat: KandidatOglasGetResponseKandidatOglas) {
    if (!kandidat.spasen) {
      this.save(kandidat, true);
    }
    else {
      this.save(kandidat, false);
    }
  }

  promijeniStatus(status: string) {
    this.status = status;

    //pozvat update
  }

  cvDetails() {
    const data = {
      id: this.selektovaniKandidatCV?.id,
      kompanijaId:this.user.id,
      kandidatId: this.selektovaniKandidatCV?.kandidatId,
      status: 'Accepted',
      spasen: this.selektovaniKandidatCV?.spasen
    }

    localStorage.setItem('kandidatOglas', JSON.stringify(data));

    this.router.navigate(['/cv-details/', this.odabraniZaPrikazCVId], {
      state: {kandidatOglas: data}
    });
  }
}



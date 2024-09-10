import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  GetBrojZaposlenihEndpoint
} from "../../endpoints/kompanija-endpoint/get-broj-zaposlenih-range/get-broj-zaposlenih-endpoint";
import {NgxPaginationModule} from "ngx-pagination";
import {NotificationToastComponent} from "../notifications/notification-toast/notification-toast.component";
import {KompanijeGetEndpoint} from "../../endpoints/kompanija-endpoint/get/kompanije-get-endpoint";
import {firstValueFrom} from "rxjs";
import {KompanijeGetRequest} from "../../endpoints/kompanija-endpoint/get/kompanije-get-request";
import {KompanijeGetResponseKomapanija} from "../../endpoints/kompanija-endpoint/get/kompanije-get-response";
import {SortParametar} from "../../endpoints/SortParametar";
import {KompanijaGetByIdResponse} from "../../endpoints/kompanija-endpoint/get-by-id/kompanija-get-by-id-response";
import {KompanijaGetByIdEndpoint} from "../../endpoints/kompanija-endpoint/get-by-id/kompanija-get-by-id-endpoint";
import {RouterLink} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {
  KandidatSpaseneKompanijeDodajRequest
} from "../../endpoints/kandidat-spasene-kompanije-endpoint/dodaj/kandidat-spasene-kompanije-dodaj-request";
import {
  KandidatSpaseneKompanijeDodajEndpoint
} from "../../endpoints/kandidat-spasene-kompanije-endpoint/dodaj/kandidat-spasene-kompanije-dodaj-endpoint";
import {NotificationService} from "../../services/notification-service";
import {
  KandidatSpaseneKompanijeUpdateRequest
} from "../../endpoints/kandidat-spasene-kompanije-endpoint/update/kandidat-spasene-kompanije-update-request";
import {
  KandidatSpaseneKompanijeUpdateEndpoint
} from "../../endpoints/kandidat-spasene-kompanije-endpoint/update/kandidat-spasene-kompanije-update-endpoint";
import {AuthService} from "../../services/auth-service";
import {User} from "../../modals/user";
import {FooterComponent} from "../footer/footer.component";


declare var bootstrap: any;


@Component({
  selector: 'app-kompanije',
  standalone: true,
  imports: [
    NavbarComponent,
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    FormsModule,
    DatePipe,
    NgxPaginationModule,
    NotificationToastComponent,
    RouterLink,
    NgClass,
    FooterComponent
  ],
  templateUrl: './kompanije.component.html',
  styleUrl: './kompanije.component.css'
})
export class KompanijeComponent implements OnInit{

  kompanije: KompanijeGetResponseKomapanija [] = []
  brojZaposlenihRange: string[] = [];
  selektovaniGradovi: string[] = [];
  isNumberOfOpenPositions: boolean = false;
  isNumberOfOpenPositionsAscending: boolean = true;
  pretragaNaziv: string = "";
  imaRezultataPretrage: boolean = true;
  itemsPerPage: number = 5;
  currentPage: number = 1;
  total: number = 10;
  kompanijaZaPrikaz: KompanijeGetResponseKomapanija |  null = null;
  searchObject: KompanijeGetRequest | null = null
  odabranaKompanijaId: string = "";
  odabranaKompanija: KompanijaGetByIdResponse | null = null;
  selektovaneLokacije: string[] = [];
  selektovaniBrojZaposlenika: string[] = [];
  imaOtvorenePozicijeLista: string[] = [];
  imaOtvorenePozicije: string | undefined = undefined;
  sortParametri: SortParametar[] | undefined = undefined
  noNextElement: boolean = false;
  noPreviousElement: boolean = true;
  selectedCompany: any;
  kandidat: User = {id: "", role: "", jwt: ""}
  imageUrl: string | ArrayBuffer | null = '';

  constructor(private getBrojZaposlenihEndpoint : GetBrojZaposlenihEndpoint,
              private kompanijeGetEndpoint: KompanijeGetEndpoint,
              private kompanijaGetByIdEndpoint: KompanijaGetByIdEndpoint,
              private kandidatSpaseneKompanijeDodajEndpoint: KandidatSpaseneKompanijeDodajEndpoint,
              private kandidatSpaseneKompanijeUpdateEndpoint: KandidatSpaseneKompanijeUpdateEndpoint,
              private notificationService: NotificationService,
              private cdr: ChangeDetectorRef,
              private authService: AuthService) {
  }

  async ngOnInit(): Promise<void> {
    this.getNumberOfEmployees();
    this.sortParametri = [];
    this.kandidat = this.authService.getLoggedUser();
    await this.getAll();
    this.setTotal();
  }

  private setTotal() {
    this.total = this.kompanije.length;
  }

  pageChangeEvent($event: number, isNewPage: boolean) {
    this.currentPage = $event;
    this.setTotal();
    if (isNewPage) {
      this.selektujPrvuKompaniju();
    }
    this.scrollToTop();
  }

  getCurrentPageItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.kompanije.slice(startIndex, endIndex);
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
      lokacija: this.selektovaneLokacije,
      brojZaposlenih: this.selektovaniBrojZaposlenika,
      naziv: this.pretragaNaziv,
      imaOtvorenePozicije: this.imaOtvorenePozicije,
      spasen: undefined,
      kandidatId: this.kandidat == null ? undefined : this.kandidat.id,
      sortParametri: this.sortParametri
    };

    try {
      const response = await firstValueFrom(this.kompanijeGetEndpoint.obradi(this.searchObject));
      this.kompanije = response.kompanije.$values;
    } catch (error) {
      console.log(error);
      this.kompanije = [];
    }

    this.selektujPrvuKompaniju();
  }

  filtriraneKompanije() {
    this.imaRezultataPretrage = this.kompanije?.length != 0;
    this.setTotal();
    return this.kompanije;
  }


  prikazDetalja(kompanija: KompanijeGetResponseKomapanija | null) {
    if (kompanija != null) {
      this.odabranaKompanijaId = kompanija.id;
      this.kompanijaZaPrikaz = kompanija;
      this.currentElementIndex = this.kompanije.findIndex(item => item.id == this.odabranaKompanijaId) - 1;
      this.currentElementIndex == -1 ? this.noPreviousElement = true : this.noPreviousElement = false;
      this.getOdabranaKompanija();
    }
  }

  getOdabranaKompanija() {
    this.kompanijaGetByIdEndpoint.obradi(this.odabranaKompanijaId).subscribe({
      next: x => {
        this.odabranaKompanija = x;
        this.odabranaKompanijaId = x?.id;
        if (x.logo) {
          this.imageUrl = `data:image/jpeg;base64,${x.logo}`;
        }
      }
    })
  }

  selektujPrvuKompaniju() {
    const currentPosts = this.getCurrentPageItems();

    if (currentPosts != undefined && currentPosts.length > 0) {
      this.kompanijaZaPrikaz = currentPosts[0];
      this.odabranaKompanijaId = currentPosts[0].id;
      this.currentElementIndex = this.kompanije.findIndex(item => item.id == this.odabranaKompanijaId);
    }

    this.prikazDetalja(this.kompanijaZaPrikaz);
  }

  currentElementIndex = 0;
  nextElement = this.getNextElement(this.currentElementIndex);
  previousElement = this.getPreviousElement(this.currentElementIndex);

  getNextElement(currentIndex: number) {
    if (currentIndex >= 0 && currentIndex < this.kompanije.length - 1) {
      return this.kompanije[currentIndex + 1];
    } else {
      return null;
    }
  }

  getPreviousElement(currentIndex: number) {
    if (currentIndex + 2 >= 0 && currentIndex < this.kompanije.length - 1) {
      return this.kompanije[currentIndex];
    } else {
      return null;
    }
  }

  ucitajSljedecuKompaniju() {
    const nextIndex = this.currentElementIndex + 1;

    if (nextIndex < this.kompanije.length - 1) {
      this.currentElementIndex = nextIndex;
      this.nextElement = this.getNextElement(this.currentElementIndex);

      if (this.mod(this.currentElementIndex, this.getNumberOfElementsOnCurrentPage()) + 2 - (this.itemsPerPage - this.getNumberOfElementsOnCurrentPage()) > this.getNumberOfElementsOnCurrentPage())
        this.pageChangeEvent(this.currentPage + 1, true);

      nextIndex + 1 == this.kompanije.length - 1 ? this.noNextElement = true : this.noNextElement = false;
      this.prikazDetalja(this.nextElement);
      this.noPreviousElement = false;
    } else {
      this.noNextElement = true;
      this.noPreviousElement = false;
    }
  }

  ucitajPrethodnuKompaniju() {
    const previousIndex = this.currentElementIndex;

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
    }
  }

  mod(a: number, b: number): number {
    return a % b;
  }

  onSearchChange(pretraga: string) {
    this.pretragaNaziv = pretraga;
    this.getAll();
  }

  dodajFilter<T>(lista: T[], item: T): T[] {
    if (lista.includes(item)) {
      return lista.filter(x => x != item);
    } else
      return [...lista, item];
  }

  locationFilter(grad: string) {
    this.selektovaneLokacije = this.dodajFilter(this.selektovaneLokacije, grad);
    this.getAll();
  }

  openPositionsFilter(isTherePosition: string) {
    this.imaOtvorenePozicijeLista = this.dodajFilter(this.imaOtvorenePozicijeLista, isTherePosition);

    console.log(this.imaOtvorenePozicijeLista);

    if(this.imaOtvorenePozicijeLista.length > 1 || this.imaOtvorenePozicijeLista.length == 0)
      this.imaOtvorenePozicije = undefined;

    else if(this.imaOtvorenePozicijeLista[0] == 'Positions available')
      this.imaOtvorenePozicije = 'Positions available';

    else if(this.imaOtvorenePozicijeLista[0] == 'No open positions')
      this.imaOtvorenePozicije = 'No open positions';

    console.log(this.imaOtvorenePozicije);

    this.getAll();
  }

  NumberOfEmployeesFilter(number: string) {
    this.selektovaniBrojZaposlenika = this.dodajFilter(this.selektovaniBrojZaposlenika, number);
    this.getAll();
  }

  getNumberOfEmployees() {
    this.getBrojZaposlenihEndpoint.obradi().subscribe({
      next: x => {
        this.brojZaposlenihRange = x.lista.$values;
      }
    })
  }

  sortirajPoKompaniji() {
    this.dodajSortiranje("Naziv", "asc");
  }

  promijeniSortiranjeZaOtvorenePozicije() {
    this.isNumberOfOpenPositionsAscending ? this.isNumberOfOpenPositionsAscending = false : this.isNumberOfOpenPositionsAscending = true;
    this.sortParametri = this.sortParametri?.filter(parametar => parametar.naziv != "BrojOtvorenihPozicija");
    this.dodajSortiranjePoOtvorenimPozicijama();
  }

  sortirajPoOtvorenimPozicijama() {
    if (this.isNumberOfOpenPositions) {
      this.isNumberOfOpenPositions = false;
      this.isNumberOfOpenPositionsAscending = false;
    } else {
      this.isNumberOfOpenPositions = true;
      this.isNumberOfOpenPositionsAscending = true;
    }

    this.dodajSortiranjePoOtvorenimPozicijama();
  }

  private dodajSortiranjePoOtvorenimPozicijama() {
    var vrstaRedoslijeda = "";
    this.isNumberOfOpenPositionsAscending ? vrstaRedoslijeda = "asc" : vrstaRedoslijeda = "desc";
    this.dodajSortiranje("BrojOtvorenihPozicija", vrstaRedoslijeda);
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


  saveKompanija(kompanija: KompanijeGetResponseKomapanija) {
    var request: KandidatSpaseneKompanijeDodajRequest = {
      kompanija_id: kompanija.id,
      kandidat_id: this.kandidat.id//promijeniti kasnije u trenutno logiranog korisnika
    }

    this.kandidatSpaseneKompanijeDodajEndpoint.obradi(request).subscribe(
      data => {
        this.notificationService.addNotification({message: 'Company saved.', type: 'success'});
        kompanija.spasen = true;
        this.cdr.detectChanges();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 500) {
          this.unsaveKompanija(kompanija, false);
        } else {
          this.notificationService.addNotification({message: `Error: ${error.message}`, type: 'error'});
        }
      }
    );
  }

  async unsaveKompanija(kompanija: KompanijeGetResponseKomapanija, spasen: boolean) {
    var request: KandidatSpaseneKompanijeUpdateRequest = {
      kompanija_id: kompanija.id,
      kandidat_id: this.kandidat.id, //promijeniti kasnije u trenutno logiranog korisnika,
      spasen: false
    };

    try {
      const data = await firstValueFrom(this.kandidatSpaseneKompanijeUpdateEndpoint.obradi(request));
      this.notificationService.addNotification({message: 'Company removed.', type: 'success'});
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

  promijeniStatus(kompanija: KompanijeGetResponseKomapanija) {
      if (kompanija.spasen == false) {
        this.saveKompanija(kompanija);
      }
      else {
        this.unsaveKompanija(kompanija, false);
      }
  }

  confirmUnsave() {
    this.unsaveKompanija(this.selectedCompany, false);
    this.closeModal();
  }

  openUnsaveModal(company: any) {
    this.selectedCompany = company;
    const modalElement = document.getElementById('confirmUnsaveModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  closeModal() {
    const modalElement = document.getElementById('confirmUnsaveModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  ucitajLogo(logo: string | ArrayBuffer | null){
    this.imageUrl = `data:image/jpeg;base64,${logo}`;
    return this.imageUrl;
  }
}

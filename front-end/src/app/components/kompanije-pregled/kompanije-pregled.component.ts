import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  GetBrojZaposlenihEndpoint
} from "../../endpoints/kompanija-endpoint/get-broj-zaposlenih-range/get-broj-zaposlenih-endpoint";
import {NgxPaginationModule} from "ngx-pagination";
import {NotificationComponent} from "../notification/notification.component";
import {KompanijeGetEndpoint} from "../../endpoints/kompanija-endpoint/get/kompanije-get-endpoint";
import {firstValueFrom} from "rxjs";
import {KompanijeGetRequest} from "../../endpoints/kompanija-endpoint/get/kompanije-get-request";
import {KompanijeGetResponseKomapanija} from "../../endpoints/kompanija-endpoint/get/kompanije-get-response";
import {OglasGetResponseOglasi} from "../../endpoints/oglas-endpoint/get/oglas-get-response";
import {OglasGetByIdResponse} from "../../endpoints/oglas-endpoint/get-by-id/oglas-get-by-id-response";
import {SortParametar} from "../../endpoints/SortParametar";

@Component({
  selector: 'app-kompanije-pregled',
  standalone: true,
  imports: [
    NavbarComponent,
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    FormsModule,
    DatePipe,
    NgxPaginationModule,
    NotificationComponent
  ],
  templateUrl: './kompanije-pregled.component.html',
  styleUrl: './kompanije-pregled.component.css'
})
export class KompanijePregledComponent implements OnInit{

  kompanije: KompanijeGetResponseKomapanija [] = []
  brojZaposlenihRange: string[] = [];
  selektovaniGradovi: string[] = [];
  isNumberOfOpenPositions: boolean = false;
  isNumberOfOpenPositionsAscending: boolean = true;
  pretragaNaziv: string = "";
  imaRezultataPretrage: boolean = true;
  itemsPerPage: number = 3;
  currentPage: number = 1;
  total: number = 10;
  kompanijaZaPrikaz: KompanijeGetResponseKomapanija |  null = null;
  searchObject: KompanijeGetRequest | null = null
  odabaranaKompanijaId: number = 0;
  odabranaKompanija: any;
  selektovaneLokacije: string[] = [];
  selektovaniBrojZaposlenika: string[] = [];
  imaOtvorenePozicijeLista: string[] = [];
  imaOtvorenePozicije: string | undefined = undefined;
  sortParametri: SortParametar[] | undefined = undefined

  constructor(private getBrojZaposlenihEndpoint : GetBrojZaposlenihEndpoint,
              private kompanijeGetEndpoint: KompanijeGetEndpoint) {
  }

  async ngOnInit(): Promise<void> {
    this.getNumberOfEmployees();
    this.sortParametri = [];
    await this.getAll();
    this.setTotal();
  }

  private setTotal() {
    this.total = this.kompanije.length;
  }

  pageChangeEvent($event: number, isNewPage: boolean) {
    this.currentPage = $event;
    this.setTotal();
    //if (isNewPage) {
      //this.selektujPrviOglas();
    //}
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
      kandidatId: undefined,
      sortParametri: this.sortParametri
    };

    try {
      const response = await firstValueFrom(this.kompanijeGetEndpoint.obradi(this.searchObject));
      this.kompanije = response.kompanije;
    } catch (error) {
      console.log(error);
      this.kompanije = [];
    }

    //this.selektujPrviOglas();
  }

  filtriraneKompanije() {
    this.imaRezultataPretrage = this.kompanije?.length != 0;
    this.setTotal();
    return this.kompanije;
  }

  prikazDetalja(kompanija: KompanijeGetResponseKomapanija | null) {
    if (kompanija != null) {
      this.odabaranaKompanijaId = kompanija.id;
      this.kompanijaZaPrikaz = kompanija;
      //this.currentElementIndex = this.oglasi.findIndex(item => item.id == this.odabaraniOglasId) - 1;
      //this.currentElementIndex == -1 ? this.noPreviousElement = true : this.noPreviousElement = false;
      this.getOdabranaKompanija();
    }
  }

  getOdabranaKompanija() {

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
        this.brojZaposlenihRange = x.lista;
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

  }



}

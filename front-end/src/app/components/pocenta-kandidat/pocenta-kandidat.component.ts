import {ChangeDetectorRef, Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {OglasGetResponse, OglasGetResponseOglasi} from "../../endpoints/oglas-endpoint/get/oglas-get-response";
import {OglasGetEndpoint} from "../../endpoints/oglas-endpoint/get/oglas-get-endpoint";
import {MojConfig} from "../../moj-config";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {OglasGetByIdEndpoint} from "../../endpoints/oglas-endpoint/get-by-id/oglas-get-by-id-endpoint";
import {OglasGetByIdResponse} from "../../endpoints/oglas-endpoint/get-by-id/oglas-get-by-id-response";
import {FormsModule} from "@angular/forms";
import {OglasGetRequest, SortParametar} from "../../endpoints/oglas-endpoint/get/oglas-get-request";
import { firstValueFrom } from 'rxjs';
import {convertOutputFile} from "@angular-devkit/build-angular/src/tools/esbuild/utils";
import {NavbarComponent} from "../navbar/navbar.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-pocenta-kandidat',
  standalone: true,
  imports: [
    NgForOf,
    NgxPaginationModule,
    DatePipe,
    NgIf,
    MatButtonToggleGroup,
    MatButtonToggle,
    FormsModule,
    NgClass,
    NavbarComponent,
    RouterLink,
  ],
  templateUrl: './pocenta-kandidat.component.html',
  styleUrl: './pocenta-kandidat.component.css'
})
export class PocentaKandidatComponent implements OnInit{

  oglasi: OglasGetResponseOglasi [] = [];
  isDaysChecked: boolean = false;
  rezultatiPretrage: any = this.oglasi;
  imaRezultataPretrage: boolean = true;
  odabaraniOglasId: number = 0;
  oglasZaPrikaz: OglasGetResponseOglasi | null = null;
  odabraniOglas: OglasGetByIdResponse | null = null;
  selektovaniGradovi: string[] = [];
  selektovaniJobType: string[] = [];
  selektovaniExperience: string[] = [];
  isDaysAscending: boolean = true;
  godineIskustva: number = 0;
  isGodineAscending: boolean = true;
  pretragaNaziv: string = "";
  searchObject: OglasGetRequest | null = null
  sortParametri: SortParametar[] | undefined = undefined
  itemsPerPage: number = 5;
  currentPage: number = 1;
  total: number = 10;
  noNextElement: boolean = false;
  noPreviousElement: boolean = true;

  constructor(private oglasGetAllEndpoint: OglasGetEndpoint,
              private oglasGetByIdEndpoint: OglasGetByIdEndpoint
  ) {}

  async ngOnInit(){
    this.sortParametri = [];
    await this.getAll();
    this.setTotal();
  }

  private setTotal() {
    this.total = this.rezultatiPretrage.length;
  }

  pageChangeEvent($event: number, isNewPage: boolean) {
    this.currentPage = $event;
    this.setTotal();
    if(isNewPage) {
      this.selektujPrviOglas();
    }
  }

  getCurrentPageItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.oglasi.slice(startIndex, endIndex);
  }

  getNumberOfElementsOnCurrentPage(): number {
    return this.getCurrentPageItems().length;
  }

  selektujPrviOglas() {
    const currentPosts = this.getCurrentPageItems();

    if (currentPosts != undefined &&  currentPosts.length > 0) {
      this.oglasZaPrikaz = currentPosts[0];
      this.odabaraniOglasId = currentPosts[0].id;
      this.currentElementIndex = this.oglasi.findIndex(item => item.id == this.odabaraniOglasId);
    }

    this.prikazDetalja(this.oglasZaPrikaz);
  }

  async getAll(){
    this.searchObject = {
      iskustvo: this.selektovaniExperience,
      lokacija: this.selektovaniGradovi,
      minimumGodinaIskustva: this.godineIskustva,
      naziv: this.pretragaNaziv,
      tipPosla: this.selektovaniJobType,
      sortParametri: this.sortParametri
    };


    try {
      const response = await firstValueFrom(this.oglasGetAllEndpoint.obradi(this.searchObject));
      this.oglasi = response.oglasi;
    } catch (error) {
      console.log(error);
      this.oglasi = [];
    }

    this.selektujPrviOglas();
  }

  dodajFilter<T>(lista: T[], item: T): T[] {
    if (lista.includes(item)) {
      return lista.filter(x => x != item);
    } else
      return [...lista, item];
  }

  locationFilter(grad: string) {
    this.selektovaniGradovi =  this.dodajFilter(this.selektovaniGradovi, grad);
    this.getAll();
  }

  jobTypeFilter(job_type: string) {
    this.selektovaniJobType =  this.dodajFilter(this.selektovaniJobType, job_type);
    this.getAll();
  }

  experienceFilter(experience: string) {
    this.selektovaniExperience =  this.dodajFilter(this.selektovaniExperience, experience);
    this.getAll();
  }

  dodajSortiranje(naziv: string, redoslijed: string) {
    var postoji = this.sortParametri?.some(parametar => parametar.naziv == naziv);

    if(postoji) {
      this.sortParametri = this.sortParametri?.filter(parametar => parametar.naziv != naziv);
    } else {
      this.sortParametri?.push(new SortParametar(naziv, redoslijed));
    }

    this.getAll();
  }

  sortirajPoPoziciji() {
    this.dodajSortiranje("NazivPozicije", "asc");
  }

  sortirajPoKompaniji() {
    this.dodajSortiranje("KompanijaNaziv", "asc");
  }

  sortirajPoDanima() {
    if(this.isDaysChecked) {
      this.isDaysChecked = false;
      this.isDaysAscending = false;
    } else {
      this.isDaysChecked = true;
      this.isDaysAscending = true;
    }

    this.dodajSortiranjeDana();
  }

  dodajSortiranjeDana() {
    var vrstaRedoslijeda = "";
    this.isDaysAscending? vrstaRedoslijeda = "asc" : vrstaRedoslijeda = "desc";
    this.dodajSortiranje("RazlikaDana", vrstaRedoslijeda);
  }

  promijeniSortiranjeZaDane() {
    this.isDaysAscending? this.isDaysAscending = false : this.isDaysAscending = true;
    this.sortParametri = this.sortParametri?.filter(parametar => parametar.naziv != "RazlikaDana");
    this.dodajSortiranjeDana();
  }

  razlikaDatuma(odabraniOglas: OglasGetByIdResponse) {
    let danasnjiDatum = new Date();
    let datum = new Date(odabraniOglas?.rokPrijave);
    let dani = Math.floor((datum.getTime() - danasnjiDatum.getTime()) / 1000 / 60 / 60 / 24);
    return dani;
  }


  getOdabraniOglas() {
    this.oglasGetByIdEndpoint.obradi(this.odabaraniOglasId).subscribe({
      next: x => {
        this.odabraniOglas = x;
        this.odabaraniOglasId = x?.id;
      }
    })
  }

  filtriraniOglasi(){
    this.imaRezultataPretrage = this.oglasi?.length != 0;
    this.setTotal();

    return this.oglasi;
  }

  prikazDetalja(oglas: OglasGetResponseOglasi | null) {
    if (oglas != null) {
      this.odabaraniOglasId = oglas.id;
      this.oglasZaPrikaz = oglas;
      this.currentElementIndex = this.oglasi.findIndex(item => item.id == this.odabaraniOglasId) - 1;
      this.currentElementIndex == -1 ?  this.noPreviousElement = true : this.noPreviousElement = false;
      this.getOdabraniOglas();
    }
  }

  currentElementIndex = 0;
  nextElement = this.getNextElement(this.currentElementIndex);
  previousElement = this.getPreviousElement(this.currentElementIndex);

  getNextElement(currentIndex: number) {
    if (currentIndex >= 0 && currentIndex < this.oglasi.length - 1) {
      return this.oglasi[currentIndex + 1];
    } else {
      return null;
    }
  }

  getPreviousElement(currentIndex: number) {
    if(currentIndex + 2 >= 0 && currentIndex < this.oglasi.length - 1) {
      return this.oglasi[currentIndex];
    }  else {
      return null;
    }
  }

  ucitajSljedeciOglas() {
    const nextIndex = this.currentElementIndex + 1;

    if (nextIndex < this.oglasi.length - 1) {
      this.currentElementIndex = nextIndex;
      this.nextElement = this.getNextElement(this.currentElementIndex);

      if(this.mod(this.currentElementIndex, this.getNumberOfElementsOnCurrentPage())  + 2 - (this.itemsPerPage - this.getNumberOfElementsOnCurrentPage()) > this.getNumberOfElementsOnCurrentPage())
        this.pageChangeEvent(this.currentPage + 1, true);

      nextIndex  + 1 == this.oglasi.length - 1 ?  this.noNextElement = true : this.noNextElement = false;
      this.prikazDetalja(this.nextElement);
      this.noPreviousElement = false;
    } else {
      this.noNextElement = true;
      this.noPreviousElement = false;
    }
  }

  ucitajPrethodniOglas() {
    const previousIndex = this.currentElementIndex;

    if(previousIndex >= 0) {
      this.previousElement = this.getPreviousElement(this.currentElementIndex);
      this.prikazDetalja(this.previousElement);

      if(this.mod(previousIndex + 1 - (this.itemsPerPage - this.getNumberOfElementsOnCurrentPage()), this.getNumberOfElementsOnCurrentPage()) == 0 && previousIndex != 0)
        this.pageChangeEvent(this.currentPage - 1, false);

      previousIndex == 0 ?  this.noPreviousElement = true : this.noPreviousElement = false;
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

  onYearsOfExperienceChange(godine: any) {
    this.godineIskustva = godine;
    this.sortirajPoGodinama();
  }

  promijeniSortiranjeZaGodine() {
    this.isGodineAscending? this.isGodineAscending = false : this.isGodineAscending = true;
    this.sortirajPoGodinama();
  }

  sortirajPoGodinama () {
    this.sortParametri = this.sortParametri?.filter(parametar => parametar.naziv != "OpisOglasa.MinimumGodinaIskustva");

    if(this.godineIskustva > 0) {
      this.dodajSortiranje("OpisOglasa.MinimumGodinaIskustva", this.isGodineAscending? "asc": "desc")
    } else {
      this.sortParametri = this.sortParametri?.filter(parametar => parametar.naziv != "OpisOglasa.MinimumGodinaIskustva");
    }

    this.getAll();
  }
}

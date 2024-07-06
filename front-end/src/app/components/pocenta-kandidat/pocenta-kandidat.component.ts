import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {OglasGetResponse, OglasGetResponseOglasi} from "../../endpoints/oglas-endpoint/get/oglas-get-response";
import {OglasGetEndpoint} from "../../endpoints/oglas-endpoint/get/oglas-get-endpoint";
import {MojConfig} from "../../moj-config";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {OglasGetByIdEndpoint} from "../../endpoints/oglas-endpoint/get-by-id/oglas-get-by-id-endpoint";
import {OglasGetByIdResponse} from "../../endpoints/oglas-endpoint/get-by-id/oglas-get-by-id-response";
import {FormsModule} from "@angular/forms";
import {OglasGetRequest, SortParametar} from "../../endpoints/oglas-endpoint/get/oglas-get-request";

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
    FormsModule
  ],
  templateUrl: './pocenta-kandidat.component.html',
  styleUrl: './pocenta-kandidat.component.css'
})
export class PocentaKandidatComponent implements OnInit{

  oglasi: OglasGetResponseOglasi [] = [];
  isDaysChecked: boolean = false;
  rezultatiPretrage: any = this.oglasi;
  imaRezultataPretrage: boolean = true;
  odabaraniOglasId: number = 5;
  odabraniOglas: OglasGetByIdResponse | null = null;
  selektovaniGradovi: string[] = [];
  selektovaniJobType: string[] = [];
  selektovaniExperience: string[] = [];
  CompanyNameSort: boolean = false;
  daysLeftSort: boolean = false;
  isDaysAscending: boolean = true;
  godineIskustva: number = 0;
  isGodineAscending: boolean = true;
  rezultati: any = this.oglasi;
  pretragaNaziv: string = "";
  searchObject: OglasGetRequest | null = null
  sortParametri: SortParametar[] | undefined = undefined

  constructor(private oglasGetAllEndpoint: OglasGetEndpoint,
              private oglasGetByIdEndpoint: OglasGetByIdEndpoint) {}

  p: string | number = 1;
  total: string | number = 0;

  private setTotal() {
    this.total = this.rezultatiPretrage.length;
  }

  pageChangeEvent($event: number) {
    this.p = $event;
    this.setTotal();
  }

  ngOnInit(): void {
    this.setTotal();
    this.sortParametri = []
    this.getAll();
  }

  getAll(): void {
    this.searchObject = {
      iskustvo: this.selektovaniExperience,
      lokacija: this.selektovaniGradovi,
      minimumGodinaIskustva: this.godineIskustva,
      naziv: this.pretragaNaziv,
      tipPosla: this.selektovaniJobType,
      sortParametri: this.sortParametri
    };

    this.oglasGetAllEndpoint.obradi(this.searchObject).subscribe({
      next: x => {
        this.oglasi = x.oglasi;
      }
    })

    console.log("pozvana getAll");
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
    } else
      this.sortParametri?.push(new SortParametar(naziv, redoslijed));

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
    let datum = new Date(odabraniOglas.rokPrijave);
    let dani = Math.floor((datum.getTime() - danasnjiDatum.getTime()) / 1000 / 60 / 60 / 24);
    return dani;
  }

  getOdabraniOglas() {
    this.oglasGetByIdEndpoint.obradi(this.odabaraniOglasId).subscribe({
      next: x => {
        this.odabraniOglas = x;
      }
    })
  }

  filtriraniOglasi(){
    this.rezultati = this.oglasi;

    if (this.rezultati.length != 0) {
      this.imaRezultataPretrage = true;
      //this.prikazDetalja(this.odabaraniOglasId);
    }
    else {
      this.imaRezultataPretrage = false;
    }

    console.log("pozvana filtrirajOglasi");

    this.setTotal();
    return this.rezultati;
  }

  prikazDetalja(id: number) {
    this.odabaraniOglasId = id;
    this.getOdabraniOglas();
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

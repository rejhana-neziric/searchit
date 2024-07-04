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
import {OglasGetRequest} from "../../endpoints/oglas-endpoint/get/oglas-get-request";

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
  jobTitleSort: boolean = false;
  CompanyNameSort: boolean = false;
  daysLeftSort: boolean = false;
  isDaysAscending: boolean = true;
  godineIskustva: number = 0;
  isGodineAscending: boolean = true;
  rezultati: any = this.oglasi;
  pretragaNaziv: string = "";
  searchObject: OglasGetRequest | null = null

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
    this.getAll();
  }

  getAll(): void {
    this.searchObject = {
      iskustvo: this.selektovaniExperience,
      lokacija: this.selektovaniGradovi,
      minimumGodinaIskustva: this.godineIskustva,
      naziv: this.pretragaNaziv,
      tipPosla: this.selektovaniJobType
    };

    this.oglasGetAllEndpoint.obradi(this.searchObject).subscribe({
      next: x => {
        this.oglasi = x.oglasi;
      }
    })

    console.log("pozvana getAll");
  }

  //sortirajPoDanima() {
  //  this.isDaysChecked ? this.isDaysChecked = false : this.isDaysChecked = true;
  //}

  sortiraj(){
    if(this.isGodineAscending)
      this.rezultati = this.rezultati.sort((a: any, b: any) => a.minimumGodinaIskustva - b.minimumGodinaIskustva);
    else
      this.rezultati = this.rezultati.sort((a: any, b: any) => b.minimumGodinaIskustva - b.minimumGodinaIskustva);

    if(this.jobTitleSort) {
      this.rezultati = this.rezultati.sort((a: any, b: any) => {
        return a.nazivPozicije.localeCompare(b.nazivPozicije)
      });
    }

    if(this.CompanyNameSort) {
      this.rezultati = this.rezultati.sort((a: any, b: any) => {
        return a.naziv.localeCompare(b.naziv);
      });
    }

    if(this.daysLeftSort) {
      if(this.isDaysAscending)
        this.rezultati = this.rezultati.sort((a: any, b: any) => this.razlikaDatuma(a.id) - this.razlikaDatuma(b.id));

      else
        this.rezultati = this.rezultati.sort((a: any, b: any) => this.razlikaDatuma(b.id) - this.razlikaDatuma(a.id));
    }
  }

  LocationFilter(grad: string) {
    if (this.selektovaniGradovi.includes(grad)) {
      this.selektovaniGradovi = this.selektovaniGradovi.filter(x => x != grad);
    } else
      this.selektovaniGradovi.push(grad);

    this.getAll();
  }

  JobTypeFilter(job_type: string) {
    if (this.selektovaniJobType.includes(job_type)) {
      this.selektovaniJobType = this.selektovaniJobType.filter(x => x != job_type);
    } else
      this.selektovaniJobType.push(job_type);

    this.getAll();
  }

  ExperienceFilter(experience: string) {
    if (this.selektovaniExperience.includes(experience)) {
      this.selektovaniExperience = this.selektovaniExperience.filter(x => x != experience);
    } else
      this.selektovaniExperience.push(experience);

    this.getAll();
  }

  SortirajPoPoziciji() {
    this.jobTitleSort ? this.jobTitleSort = false : this.jobTitleSort = true;
    this.filtriraniOglasi();
  }

  SortirajPoKompaniji() {
    this.CompanyNameSort ? this.CompanyNameSort = false : this.CompanyNameSort = true;
    this.filtriraniOglasi();
  }

  sortirajPoDanima() {
    this.isDaysChecked ? this.isDaysChecked = false : this.isDaysChecked = true;
    this.daysLeftSort ? this.daysLeftSort = false : this.daysLeftSort = true;
    this.filtriraniOglasi();
  }

  promijeniSortiranjeZaDane() {
    this.isDaysAscending? this.isDaysAscending = false : this.isDaysAscending = true;
  }

  promijeniSortiranjeZaGodine() {
    this.isGodineAscending? this.isGodineAscending = false : this.isGodineAscending = true;
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

    //this.sortiraj();

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
    this.getAll();
  }
}

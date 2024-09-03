import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {FormsModule} from "@angular/forms";
import {DatePipe, NgClass} from "@angular/common";
import {OglasDodajEndpoint} from "../../endpoints/oglas-endpoint/dodaj/oglas-dodaj-endpoint";
import {response} from "express";
import {RouterLink} from "@angular/router";
import {KompanijeGetEndpoint} from "../../endpoints/kompanija-endpoint/get/kompanije-get-endpoint";
import {KompanijeGetResponseKomapanija} from "../../endpoints/kompanija-endpoint/get/kompanije-get-response";
import {firstValueFrom} from "rxjs";
import {AppRoutingModule} from "../../app.routes";

@Component({
  selector: 'app-oglas-dodaj',
  standalone: true,
    imports: [
        NavbarComponent,
        FormsModule,
        RouterLink,
        NgClass,
    ],
  templateUrl: './oglas-dodaj.component.html',
  styleUrl: './oglas-dodaj.component.css',
  providers: [DatePipe]
})
export class OglasDodajComponent {
  @Output() customEvent= new EventEmitter<string>();
  @Input() oglas:any;

  form:any={
    kompanija_id:null,
    naziv_pozicije: null,
    lokacija: null,
    datum_objave: null,
    plata: null,
    tip_posla: null,
    rok_prijave: null,
    iskustvo:[] as string[],
    datum_modificiranja: null,
    opis_pozicije:null,
    minimum_godina_iskustva:null,
    preferirane_godine_iskustva:null,
    kvalifikacija:null,
    vjestine:null,
    benefiti:null,
    objavljen:false
  };

  kompanije: KompanijeGetResponseKomapanija[]=[];

  constructor(private oglasDodajEndpoint: OglasDodajEndpoint,
              private kompanijeGetEndpoint: KompanijeGetEndpoint,
              private datePipe:DatePipe) {
    this.getAll();
  }

  async getAll() {
    try {
      const response = await firstValueFrom(this.kompanijeGetEndpoint.obradi({}));
      this.kompanije = response.kompanije.$values;
    } catch (error) {
      console.log(error);
      this.kompanije = [];
    }

    //console.log(this.kompanije);
  }

  onSubmitDraft(event: Event){
    event.preventDefault();
    const now = new Date();
    this.form.datum_modificiranja = this.datePipe.transform(now, 'yyyy-MM-dd');
    this.form.datum_objave=this.form.datum_modificiranja;
    this.form.kompanija_id = this.kompanije[0].id;
    this.form.objavljen = false;
    console.log("draft funk")
    this.oglasDodajEndpoint.obradi(this.form).subscribe(response=>{
      console.log("Oglas uspjesno dodan", response);
    });
  }
  onSubmit(){
    const now = new Date();
    this.form.datum_modificiranja = this.datePipe.transform(now, 'yyyy-MM-dd');
    this.form.datum_objave=this.form.datum_modificiranja;
    console.log(this.kompanije)
    this.form.kompanija_id = this.kompanije[0].id;
    this.form.objavljen = true;
    console.log("glavna funk")
    this.oglasDodajEndpoint.obradi(this.form).subscribe(response=>{
      console.log("Oglas uspjesno dodan", response);
    });
  }

  onCheckboxChange(event: Event, value: string): void {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      if (!this.form.iskustvo.includes(value)) {
        this.form.iskustvo.push(value);
      }
    } else {
      this.form.iskustvo = this.form.iskustvo.filter((item: string) => item !== value);
    }
    console.log(this.form.iskustvo)
  }
}

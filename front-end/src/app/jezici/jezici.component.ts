import { Component, OnInit } from '@angular/core';
import { MojConfig } from "../moj-config";
import { HttpClient } from "@angular/common/http";
import { JeziciPretragaResponse, JeziciPretragaResponseJezik } from "./jezici-pretraga-response";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-jezici',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './jezici.component.html',
  styleUrls: ['./jezici.component.css']
})
export class JeziciComponent implements OnInit {
  naziv: string = '';
  jezici: JeziciPretragaResponseJezik[] = [];

  constructor(private httpKlijent: HttpClient) { }

  ngOnInit(): void {
    this.testirajApi();
  }

  testirajApi() {
    this.httpKlijent.get<JeziciPretragaResponse>(MojConfig.lokalna_adresa + '/jezik-pretraga').subscribe({
      next: (x) => {
        this.jezici = x.jezici;
        console.log(this.jezici);
      },
      error: (err) => {
        console.error('Error fetching jezici:', err);
      }
    });
  }

  dodajJezik() {
    if (this.naziv.trim()) {
      const noviJezik: JeziciPretragaResponseJezik = {
        naziv: this.naziv
      };
      this.httpKlijent.post(MojConfig.lokalna_adresa + '/jezik-dodaj', noviJezik, {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe({
        next: (x) => {
          this.naziv = '';
          this.testirajApi();
        },
        error: (err) => {
          console.log('Error doing post request: ', err);
        }
      });
    }

  }
}

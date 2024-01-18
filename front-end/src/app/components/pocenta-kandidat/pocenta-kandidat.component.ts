import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {OglasGetAllResponse, OglasGetAllResponseOglasi} from "../../endpoints/oglas-endpoint/oglas-get-all-response";
import {OglasGetAllEndpoint} from "../../endpoints/oglas-endpoint/oglas-get-all-endpoint";
import {MojConfig} from "../../moj-config";

@Component({
  selector: 'app-pocenta-kandidat',
  standalone: true,
  imports: [
    NgForOf,
    NgxPaginationModule,
    DatePipe
  ],
  templateUrl: './pocenta-kandidat.component.html',
  styleUrl: './pocenta-kandidat.component.css'
})
export class PocentaKandidatComponent implements OnInit{

  public oglasi: OglasGetAllResponseOglasi [] = [];

  constructor(private oglasGetAllEndpoint: OglasGetAllEndpoint) {}

  p: string | number = 1;
  total: string | number = 0;

  private getUsers() {
    this.total = 9;
  }

  pageChangeEvent($event: number) {
    this.p = $event;
    this.getUsers();
  }

  ngOnInit(): void {
    this.getUsers();

    let url = MojConfig.lokalna_adresa + `/oglas-get-all`;

    this.oglasGetAllEndpoint.obradi().subscribe((x: OglasGetAllResponse) => {
      this.oglasi = x.oglasi;
    })
  }

}

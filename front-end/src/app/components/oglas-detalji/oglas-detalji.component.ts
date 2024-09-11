import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {OglasGetByIdEndpoint} from "../../endpoints/oglas-endpoint/get-by-id/oglas-get-by-id-endpoint";
import {OglasGetByIdResponse} from "../../endpoints/oglas-endpoint/get-by-id/oglas-get-by-id-response";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-oglas-detalji',
  standalone: true,
  imports: [
    NavbarComponent,
    DatePipe,
    NgForOf,
    NgIf,
    RouterLink,
    FooterComponent
  ],
  templateUrl: './oglas-detalji.component.html',
  styleUrl: './oglas-detalji.component.css'
})
export class OglasDetaljiComponent implements OnInit {

  oglasiId: number | undefined = undefined;
  oglas: OglasGetByIdResponse | null = null;
  imageUrl: string | ArrayBuffer | null = '';

  constructor(private activatedRoute: ActivatedRoute,
              private oglasGetByIdEndpoint: OglasGetByIdEndpoint) {
  }

  ngOnInit(): void {
    this.oglasiId = this.activatedRoute.snapshot.params["id"];
    this.getOglas();
  }

  getOglas() {
    this.oglasGetByIdEndpoint.obradi(this.oglasiId!).subscribe({
      next: x => {
        this.oglas = x;
        console.log("oglas id = " + this.oglas.nazivPozicije);
      }
    })
  }

  razlikaDatuma(oglas: OglasGetByIdResponse) {
    let danasnjiDatum = new Date();
    let datum = new Date(oglas?.rokPrijave);
    let dani = Math.floor((datum.getTime() - danasnjiDatum.getTime()) / 1000 / 60 / 60 / 24);
    return dani;
  }

  ucitajLogo(logo: string | ArrayBuffer | null){
    this.imageUrl = `data:image/jpeg;base64,${logo}`;
    return this.imageUrl;
  }
}

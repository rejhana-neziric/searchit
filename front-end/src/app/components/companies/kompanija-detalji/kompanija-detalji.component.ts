import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {KompanijaGetByIdResponse} from "../../../endpoints/kompanija-endpoint/get-by-id/kompanija-get-by-id-response";
import {KompanijaGetByIdEndpoint} from "../../../endpoints/kompanija-endpoint/get-by-id/kompanija-get-by-id-endpoint";
import {NgxPaginationModule} from "ngx-pagination";
import {NotificationToastComponent} from "../../notifications/notification-toast/notification-toast.component";
import {firstValueFrom} from "rxjs";
import {OglasGetRequest} from "../../../endpoints/oglas-endpoint/get/oglas-get-request";
import {OglasGetEndpoint} from "../../../endpoints/oglas-endpoint/get/oglas-get-endpoint";
import {OglasGetResponseOglasi} from "../../../endpoints/oglas-endpoint/get/oglas-get-response";
import {FooterComponent} from "../../layout/footer/footer.component";

@Component({
  selector: 'app-kompanija-detalji',
  standalone: true,
    imports: [
        NavbarComponent,
        DatePipe,
        NgForOf,
        RouterLink,
        NgIf,
        NgxPaginationModule,
        NotificationToastComponent,
        FooterComponent
    ],
  templateUrl: './kompanija-detalji.component.html',
  styleUrl: './kompanija-detalji.component.css'
})
export class KompanijaDetaljiComponent implements OnInit{

  kompanijaId: string | undefined = undefined;
  kompanija: KompanijaGetByIdResponse | null = null;
  searchObject: OglasGetRequest | null = null
  oglasi: OglasGetResponseOglasi [] = [];
  imageUrl: string | ArrayBuffer | null = '';

  constructor(private activatedRoute: ActivatedRoute,
              private kompanijaGetByIdEndpoint: KompanijaGetByIdEndpoint,
              private oglasGetAllEndpoint: OglasGetEndpoint) {
  }

  async ngOnInit(): Promise<void> {
    this.kompanijaId = this.activatedRoute.snapshot.params["id"];
    this.getKompanija();
    await this.getOglasi();
  }

  getKompanija() {
    this.kompanijaGetByIdEndpoint.obradi(this.kompanijaId!).subscribe({
      next: x => {
        this.kompanija = x;
        if (x.logo) {
          this.imageUrl = `data:image/jpeg;base64,${x.logo}`;
        }
      }
    })
  }

  async getOglasi() {
    this.searchObject = {
      iskustvo: undefined,
      lokacija: undefined,
      minimumGodinaIskustva: undefined,
      naziv: undefined,
      tipPosla: undefined,
      sortParametri: undefined,
      kompanijaId: this.kompanijaId,
      otvoren: true
    };

    try {
      const response = await firstValueFrom(this.oglasGetAllEndpoint.obradi(this.searchObject));
      this.oglasi = response.oglasi.$values;
    } catch (error) {
      console.log(error);
      this.oglasi = [];
    }
  }

  ucitajLogo(logo: string | ArrayBuffer | null){
    this.imageUrl = `data:image/jpeg;base64,${logo}`;
    return this.imageUrl;
  }
}

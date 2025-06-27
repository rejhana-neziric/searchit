import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {KanidatSpaseniOglasiDodajRequest} from "./kanidat-spaseni-oglasi-dodaj-request";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {OglasGetRequest} from "../../oglas-endpoint/get/oglas-get-request";
import {Observable} from "rxjs";
import {OglasGetResponse} from "../../oglas-endpoint/get/oglas-get-response";
import {MojConfig} from "../../../moj-config";

@Injectable({providedIn: 'root'})
export class KandidatSpaseniOglasiDodajEndpoint implements MyBaseEndpoint<KanidatSpaseniOglasiDodajRequest, number> {
  constructor(public httpClient: HttpClient) {
  }

  obradi(request: KanidatSpaseniOglasiDodajRequest): Observable<number> {
    let url = MojConfig.lokalna_adresa + `/kandidat-spaseni-oglas-dodaj`;

    return this.httpClient.post<number>(url, request);
  }

}

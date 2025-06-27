import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {KandidatOglasDodajRequest} from "./kandidat-oglas-dodaj-request";

@Injectable({providedIn: 'root'})
export class KandidatOglasDodajEndpoint implements MyBaseEndpoint<KandidatOglasDodajRequest, any> {
  constructor(public httpClient: HttpClient) { }

  obradi(request: KandidatOglasDodajRequest): Observable<any> {
    let url = MojConfig.lokalna_adresa + `/kandidat-oglas-dodaj`;

    return this.httpClient.post<any>(url, request);
  }
}

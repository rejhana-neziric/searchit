import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {KandidatOglasGetRequest} from "./kandidat-oglas-get-request";
import {KandidatOglasGetResponse} from "./kandidat-oglas-get-response";

@Injectable({providedIn: 'root'})
export class KandidatOglasGetEndpoint implements MyBaseEndpoint<KandidatOglasGetRequest, KandidatOglasGetResponse> {
  constructor(public httpClient: HttpClient) { }

  obradi(request: KandidatOglasGetRequest): Observable<KandidatOglasGetResponse> {
    let url = MojConfig.lokalna_adresa + `/kandidat-oglas-get`;

    let params = new HttpParams();

    if (request.kandidatId) {
      params = params.set('kandidatId', request.kandidatId);
    }

    if (request.kompanijaId) {
      params = params.set('kompanijaId', request.kompanijaId);
    }

    if (request.pretragaNaziv) {
      params = params.set('pretragaNaziv', request.pretragaNaziv);
    }

    if (request.spasen) {
      params = params.set('spasen', request.spasen);
    }

    if (request.status) {
      params = params.set('status', request.status);
    }

    if (request.otvoren) {
      params = params.set('otvoren', request.otvoren);
    }

    return this.httpClient.get<KandidatOglasGetResponse>(url, {params});
  }
}

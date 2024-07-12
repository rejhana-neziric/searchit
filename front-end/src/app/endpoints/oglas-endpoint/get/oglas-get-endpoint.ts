import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {OglasGetResponse} from "./oglas-get-response";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MojConfig} from "../../../moj-config";
import {Injectable} from "@angular/core";
import {OglasGetRequest, SortParametar} from "./oglas-get-request";
@Injectable({providedIn: 'root'})
export class OglasGetEndpoint implements MyBaseEndpoint<OglasGetRequest, OglasGetResponse> {
  constructor(public httpClient: HttpClient) { }

  obradi(request: OglasGetRequest): Observable<OglasGetResponse> {
    let url = MojConfig.lokalna_adresa + `/oglas-get`;

    let params = new HttpParams();

    if (request.naziv) {
      params = params.set('naziv', request.naziv);
    }

    if (request.tipPosla) {
      request.tipPosla.forEach((l, index) => {
        params = params.append(`tipPosla[${index}]`, l);
      });
    }

    if (request.minimumGodinaIskustva) {
      params = params.set('minimumGodinaIskustva', request.minimumGodinaIskustva);
    }

    if (request.spasen) {
      params = params.set('spasen', request.spasen);
    }

    if (request.kandidatId) {
      params = params.set('kandidatId', request.kandidatId);
    }

    if (request.filters) {
      for (const key in request.filters) {
        if (request.filters.hasOwnProperty(key)) {
          params = params.set(`filters[${key}]`, request.filters[key]);
        }
      }
    }

    if (request.lokacija) {
      request.lokacija.forEach((l, index) => {
        params = params.append(`lokacija[${index}]`, l);
      });
    }

    if (request.iskustvo) {
      request.iskustvo.forEach((i, index) => {
        params = params.append(`iskustvo[${index}]`, i);
      });
    }

    if(request.sortParametri) {
      request.sortParametri.forEach((param, index) => {
        params = params.append(`sortParametri[${index}].naziv`, param.naziv);
        params = params.append(`sortParametri[${index}].redoslijed`, param.redoslijed);
      });
    }

    return this.httpClient.get<OglasGetResponse>(url, {params});
  }
}

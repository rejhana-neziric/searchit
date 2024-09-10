import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {OglasGetRequest} from "../../oglas-endpoint/get/oglas-get-request";
import {OglasGetResponse} from "../../oglas-endpoint/get/oglas-get-response";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {CVGetRequest} from "./cv-get-request";
import {CVGetResponse} from "./cv-get-response";

@Injectable({providedIn: 'root'})
export class CVGetEndpoint implements MyBaseEndpoint<CVGetRequest, CVGetResponse> {
  constructor(public httpClient: HttpClient) { }

  obradi(request: CVGetRequest): Observable<CVGetResponse> {
    let url = MojConfig.lokalna_adresa + `/cv-get`;

    let params = new HttpParams();

    if (request.kandidatId) {
      params = params.set('kandidatId', request.kandidatId);
    }

    if (request.objavljen) {
      params = params.set('objavljen', request.objavljen);
    }

   /* if (request.tipPosla) {
      request.tipPosla.forEach((l, index) => {
        params = params.append(`tipPosla[${index}]`, l);
      });
    }

    if (request.minimumGodinaIskustva) {
      params = params.set('minimumGodinaIskustva', request.minimumGodinaIskustva);
    }

    if (request.kompanijaId) {
      params = params.set('kompanijaId', request.kompanijaId);
    }

    if (request.spasen) {
      params = params.set('spasen', request.spasen);
    }

    if (request.otvoren) {
      params = params.set('otvoren', request.otvoren);
    }

    if(request.objavljen) {
      params = params.set('objavljen', request.objavljen);
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
    }*/

    return this.httpClient.get<CVGetResponse>(url, {params});
  }
}

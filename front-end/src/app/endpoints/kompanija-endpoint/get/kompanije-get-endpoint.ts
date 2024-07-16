import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {KompanijeGetRequest} from "./kompanije-get-request";
import {KompanijeGetResponse} from "./kompanije-get-response";
import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {OglasGetRequest} from "../../oglas-endpoint/get/oglas-get-request";
import {Observable} from "rxjs";
import {OglasGetResponse} from "../../oglas-endpoint/get/oglas-get-response";
import {MojConfig} from "../../../moj-config";

@Injectable({providedIn: 'root'})
export class KompanijeGetEndpoint implements MyBaseEndpoint<KompanijeGetRequest, KompanijeGetResponse> {
  constructor(public httpClient: HttpClient) { }

  obradi(request: KompanijeGetRequest): Observable<KompanijeGetResponse> {
    let url = MojConfig.lokalna_adresa + `/kompanija-get`;

    let params = new HttpParams();

    if (request.naziv) {
      params = params.set('naziv', request.naziv);
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

    if (request.brojZaposlenih) {
      request.brojZaposlenih.forEach((l, index) => {
        params = params.append(`brojZaposlenih[${index}]`, l);
      });
    }

    if (request.imaOtvorenePozicije) {
      params = params.set('imaOtvorenePozicije', request.imaOtvorenePozicije);
    }

    if(request.sortParametri) {
      request.sortParametri.forEach((param, index) => {
        params = params.append(`sortParametri[${index}].naziv`, param.naziv);
        params = params.append(`sortParametri[${index}].redoslijed`, param.redoslijed);
      });
    }

    return this.httpClient.get<KompanijeGetResponse>(url, {params});
  }
}

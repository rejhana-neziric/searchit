import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {KompanijeGetRequest} from "../../kompanija-endpoint/get/kompanije-get-request";
import {KompanijeGetResponse} from "../../kompanija-endpoint/get/kompanije-get-response";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {LokacijaGetResponse} from "./lokacija-get-response";

@Injectable({providedIn: 'root'})
export class LokacijaGetEndpoint implements MyBaseEndpoint<any, LokacijaGetResponse> {
  constructor(public httpClient: HttpClient) { }

  obradi(): Observable<LokacijaGetResponse> {
    let url = MojConfig.lokalna_adresa + `/lokacija-get`;

    return this.httpClient.get<LokacijaGetResponse>(url);
  }
}

import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import internal from "node:stream";
import {KompanijaGetByIdResponse} from "./kompanija-get-by-id-response";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";

@Injectable({providedIn: 'root'})
export class KompanijaGetByIdEndpoint implements MyBaseEndpoint<string, KompanijaGetByIdResponse> {
  constructor(public httpClient: HttpClient) { }

  obradi(id: string): Observable<KompanijaGetByIdResponse> {
    let url = MojConfig.lokalna_adresa + `/kompanija/get-by-id/${id}`;

    return this.httpClient.get<KompanijaGetByIdResponse>(url);
  }
}

import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {KompanijeGetRequest} from "../../kompanija-endpoint/get/kompanije-get-request";
import {KompanijeGetResponse} from "../../kompanija-endpoint/get/kompanije-get-response";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {KorisnikGetResponse} from "./korisnik-get-response";

@Injectable({providedIn: 'root'})
export class KorisnikGetEndpoint implements MyBaseEndpoint<any, KorisnikGetResponse> {
  constructor(public httpClient: HttpClient) { }

  obradi(): Observable<KorisnikGetResponse> {
    let url = MojConfig.lokalna_adresa + `/korisnici-get`;

    return this.httpClient.get<KorisnikGetResponse>(url);
  }
}

import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {KorisnikGetAllResponse} from "./korisnik-get-all-response";

@Injectable({providedIn: 'root'})
export class KorisnikGetAllEndpoint implements MyBaseEndpoint<any, KorisnikGetAllResponse> {
  constructor(public httpClient: HttpClient) { }

  obradi(): Observable<KorisnikGetAllResponse> {
    let url = MojConfig.lokalna_adresa + `/korisnici-get-all`;

    return this.httpClient.get<KorisnikGetAllResponse>(url);
  }
}

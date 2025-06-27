import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {KorisnikGetByUsernameRequest} from "./korisnik-get-by-username-request";
import {KorisnikGetByUsernameResponse} from "./korisnik-get-by-username-response";

@Injectable({providedIn:"root"})
export class KorisnikGetByUsernameEndpoint implements MyBaseEndpoint<KorisnikGetByUsernameRequest, KorisnikGetByUsernameResponse>
{
  constructor(public httpClient: HttpClient) {
  }

  obradi(request: KorisnikGetByUsernameRequest): Observable<KorisnikGetByUsernameResponse> {
    const url = MojConfig.lokalna_adresa + '/get-by-username';

    const params = new HttpParams()
      .set('username', request.username.toString());

    return this.httpClient.get<KorisnikGetByUsernameResponse>(url, {params});
  }
}

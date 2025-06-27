import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {PorukaGetResponse} from "./get-by-korisnik-id-response";

@Injectable({providedIn: "root"})
export class PorukeGetByKandidatIdEndpoint implements MyBaseEndpoint<string, PorukaGetResponse>
{
  constructor(public httpClient: HttpClient) {
  }

  obradi(id:string):Observable<PorukaGetResponse>
  {
    let url = MojConfig.lokalna_adresa + `/poruka-get/${id}`;

    return this.httpClient.get<PorukaGetResponse>(url);
  }
}

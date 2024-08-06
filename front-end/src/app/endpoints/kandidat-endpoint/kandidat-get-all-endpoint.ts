import {MyBaseEndpoint} from "../MyBaseEndpoint";
import {KandidatGetAllResponse} from "./kandidat-get-all-response";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../../moj-config";
import {Injectable} from "@angular/core";
@Injectable({providedIn: 'root'})
export class KandidatGetAllEndpoint implements MyBaseEndpoint<void, KandidatGetAllResponse> {
  constructor(public httpClient: HttpClient) {

  }

  obradi(request: void): Observable<KandidatGetAllResponse> {
    let url = MojConfig.lokalna_adresa + `/kandidat-pretraga`;

    return this.httpClient.get<KandidatGetAllResponse>(url);
  }

}

import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {StatusPrijaveGetResponse} from "./status-prijave-get-response";

@Injectable({providedIn: 'root'})
export class StatusPrijaveGetEndpoint implements MyBaseEndpoint<void, StatusPrijaveGetResponse> {

  constructor(public httpClient: HttpClient) { }

  obradi(request: void): Observable<StatusPrijaveGetResponse> {
    let url = MojConfig.lokalna_adresa + `/status-prijave-get`;

    return this.httpClient.get<StatusPrijaveGetResponse>(url);
  }
}

import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {LokacijaGetResponse} from "../../lokacija-endpoint/get/lokacija-get-response";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {IskustvoGetResponse} from "./iskustvo-get-response";

@Injectable({providedIn: 'root'})
export class IskustvoGetEndpoint implements MyBaseEndpoint<any, IskustvoGetResponse> {
  constructor(public httpClient: HttpClient) { }

  obradi(): Observable<IskustvoGetResponse> {
    let url = MojConfig.lokalna_adresa + `/iskustvo-get`;

    return this.httpClient.get<IskustvoGetResponse>(url);
  }
}

import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { Observable } from "rxjs";
import {MojConfig} from "../../../moj-config";

@Injectable({providedIn: 'root'})
export class KandidatDodajEndpoint implements MyBaseEndpoint<any, any> {
  constructor(public httpClient: HttpClient) { }

  obradi(request: any): Observable<any> {
    let url = MojConfig.lokalna_adresa + `/kandidat-dodaj`;

    return this.httpClient.post<any>(url, request);
  }
}


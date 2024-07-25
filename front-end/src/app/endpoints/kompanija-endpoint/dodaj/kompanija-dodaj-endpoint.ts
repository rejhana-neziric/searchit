import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class KompanijaDodajEndpoint implements MyBaseEndpoint<any, any> {
  constructor(public httpClient: HttpClient) { }

  obradi(request: any): Observable<any> {
    let url = MojConfig.lokalna_adresa + `/kompanija-dodaj`;

    return this.httpClient.post<any>(url, request);
  }
}

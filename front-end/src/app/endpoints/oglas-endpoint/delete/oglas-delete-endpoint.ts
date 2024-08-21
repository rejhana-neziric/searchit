import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { Observable } from "rxjs";
import {MojConfig} from "../../../moj-config";

@Injectable({providedIn: 'root'})
export class OglasDeleteEndpoint implements MyBaseEndpoint<any, any> {
  constructor(public httpClient: HttpClient) { }

  obradi(request: any): Observable<any> {
    let url = MojConfig.lokalna_adresa + `/oglas-delete`;

    let params = new HttpParams().set('oglas_id', request.oglas_id);

    return this.httpClient.delete<any>(url, { params });
  }
}


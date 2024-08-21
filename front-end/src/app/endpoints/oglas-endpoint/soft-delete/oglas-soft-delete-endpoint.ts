import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { Observable } from "rxjs";
import {MojConfig} from "../../../moj-config";
import {OglasSoftDeleteRequest} from "./oglas-soft-delete-request";

@Injectable({ providedIn: 'root' })
export class OglasSoftDeleteEndpoint implements MyBaseEndpoint<any, any> {
  constructor(public httpClient: HttpClient) { }

  obradi(request: OglasSoftDeleteRequest): Observable<OglasSoftDeleteRequest> {
    const url = MojConfig.lokalna_adresa + `/oglas-soft-delete`;

    return this.httpClient.put<any>(url, request);
  }
}

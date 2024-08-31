import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {OglasGetByIdResponse} from "../../oglas-endpoint/get-by-id/oglas-get-by-id-response";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {CVGetByIdResponse} from "./cv-get-by-id-response";

@Injectable({providedIn: 'root'})
export class CVGetByIdEndpoint implements MyBaseEndpoint<number, CVGetByIdResponse> {
  constructor(public httpClient: HttpClient) { }

  obradi(id: number): Observable<CVGetByIdResponse> {
    let url = MojConfig.lokalna_adresa + `/cv/get-by-id/${id}`;

    return this.httpClient.get<CVGetByIdResponse>(url);
  }

}

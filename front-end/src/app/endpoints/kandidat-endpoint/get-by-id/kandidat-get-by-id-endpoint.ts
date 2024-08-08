import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {OglasGetByIdResponse} from "../../oglas-endpoint/get-by-id/oglas-get-by-id-response";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {KandidatGetByIdResponse} from "./kandidat-get-by-id-response";

@Injectable({providedIn: 'root'})
export class KandidatGetByIdEndpoint implements MyBaseEndpoint<string, KandidatGetByIdResponse> {
  constructor(public httpClient: HttpClient) { }

  obradi(id: string): Observable<KandidatGetByIdResponse> {
    let url = MojConfig.lokalna_adresa + `/kandidat/get-by-id/${id}`;

    return this.httpClient.get<KandidatGetByIdResponse>(url);
  }

}

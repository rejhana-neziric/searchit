import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {OglasGetByIdResponse} from "./oglas-get-by-id-response";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OglasGetResponse} from "../get/oglas-get-response";
import {MojConfig} from "../../../moj-config";

@Injectable({providedIn: 'root'})
export class OglasGetByIdEndpoint implements MyBaseEndpoint<number, OglasGetByIdResponse> {
  constructor(public httpClient: HttpClient) { }

  obradi(id: number): Observable<OglasGetByIdResponse> {
    let url = MojConfig.lokalna_adresa + `/oglas/get-by-id/${id}`;

    return this.httpClient.get<OglasGetByIdResponse>(url);
  }

}

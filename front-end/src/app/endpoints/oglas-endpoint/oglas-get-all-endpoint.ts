import {MyBaseEndpoint} from "../MyBaseEndpoint";
import {OglasGetAllResponse} from "./oglas-get-all-response";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../../moj-config";
import {Injectable} from "@angular/core";
@Injectable({providedIn: 'root'})
export class OglasGetAllEndpoint implements MyBaseEndpoint<void, OglasGetAllResponse> {
  constructor(public httpClient: HttpClient) {

  }

  obradi(request: void): Observable<OglasGetAllResponse> {
    let url = MojConfig.lokalna_adresa + `/oglas-get-all`;

    return this.httpClient.get<OglasGetAllResponse>(url);
  }

}

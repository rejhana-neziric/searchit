import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {OglasUpdateRequest} from "./oglas-update-request";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";

@Injectable({providedIn: "root"})
export class OglasUpdateEndpoint implements MyBaseEndpoint<OglasUpdateRequest, number> {
  constructor(private httpClient: HttpClient) {
  }

  obradi(request: OglasUpdateRequest): Observable<number> {
    let url = MojConfig.lokalna_adresa + `/oglas-update`;

    return this.httpClient.post<number>(url, request);
  }

}


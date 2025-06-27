import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {KompanijaUpdateRequest} from "./kompanija-update-request";

@Injectable({providedIn: "root"})
export class KompanijaUpdateEndpoint implements MyBaseEndpoint<KompanijaUpdateRequest, any> {
  constructor(private httpClient: HttpClient) {
  }

  obradi(request: KompanijaUpdateRequest): Observable<any> {
    let url = MojConfig.lokalna_adresa + `/kompanija-update`;

    return this.httpClient.put<any>(url, request);
  }

}

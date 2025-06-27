import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {OglasUpdateRequest} from "../../oglas-endpoint/update/oglas-update-request";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {KandidatUpdateRequest} from "./kandidat-update-request";

@Injectable({providedIn: "root"})
export class KandidatUpdateEndpoint implements MyBaseEndpoint<KandidatUpdateRequest, any> {
  constructor(private httpClient: HttpClient) {
  }

  obradi(request: KandidatUpdateRequest): Observable<any> {
    let url = MojConfig.lokalna_adresa + `/kandidat-update`;

    return this.httpClient.put<any>(url, request);
  }

}

import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {KandidatOglasUpdateRequest} from "./kandidat-oglas-update-request";

@Injectable({providedIn: "root"})
export class KandidatOglasUpdateEndpoint implements MyBaseEndpoint<KandidatOglasUpdateRequest, number> {
  constructor(private httpClient: HttpClient) {
  }

  obradi(request: KandidatOglasUpdateRequest): Observable<number> {
    let url = MojConfig.lokalna_adresa + `/kandidat-oglas-update`;

    return this.httpClient.put<number>(url, request);
  }

}

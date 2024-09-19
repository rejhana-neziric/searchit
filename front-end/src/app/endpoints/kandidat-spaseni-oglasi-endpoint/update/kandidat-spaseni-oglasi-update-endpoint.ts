import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {OglasUpdateRequest} from "../../oglas-endpoint/update/oglas-update-request";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {KanidatSpaseniOglasiUpdateRequest} from "./kanidat-spaseni-oglasi-update-request";

@Injectable({providedIn: "root"})
export class KandidatSpaseniOglasiUpdateEndpoint implements MyBaseEndpoint<KanidatSpaseniOglasiUpdateRequest, number> {
  constructor(private httpClient: HttpClient) {
  }

  obradi(request: KanidatSpaseniOglasiUpdateRequest): Observable<number> {
    let url = MojConfig.lokalna_adresa + `/kandidat-spaseni-oglas-update`;

    return this.httpClient.patch<number>(url, request);
  }

}

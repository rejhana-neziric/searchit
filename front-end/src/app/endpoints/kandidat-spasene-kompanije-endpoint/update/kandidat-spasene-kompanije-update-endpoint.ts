import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {KandidatSpaseneKompanijeUpdateRequest} from "./kandidat-spasene-kompanije-update-request";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class KandidatSpaseneKompanijeUpdateEndpoint implements MyBaseEndpoint<KandidatSpaseneKompanijeUpdateRequest, number>{
  constructor(private httpClient: HttpClient) {
  }

  obradi(request: KandidatSpaseneKompanijeUpdateRequest): Observable<number> {
    let url = MojConfig.lokalna_adresa + `/kandidat-spasene-kompanije-update`;

    return this.httpClient.patch<number>(url, request);
  }
}

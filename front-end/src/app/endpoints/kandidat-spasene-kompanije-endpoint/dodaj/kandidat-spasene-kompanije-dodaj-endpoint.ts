import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {Injectable} from "@angular/core";
import {KandidatSpaseneKompanijeDodajRequest} from "./kandidat-spasene-kompanije-dodaj-request";

@Injectable({providedIn: 'root'})
export class KandidatSpaseneKompanijeDodajEndpoint implements MyBaseEndpoint<KandidatSpaseneKompanijeDodajRequest, number>{
  constructor(public httpClient: HttpClient) {
  }

  obradi(request: KandidatSpaseneKompanijeDodajRequest): Observable<number> {
    let url = MojConfig.lokalna_adresa + `/kandidat-spasene-kompanije-dodaj`;

    return this.httpClient.post<number>(url, request);
  }
}

import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";

@Injectable({providedIn: "root"})
export class KandidatOglasDeleteEndpoint implements MyBaseEndpoint<number, any> {
  constructor(private httpClient: HttpClient) {
  }

  obradi(id: number): Observable<any> {
    let url = MojConfig.lokalna_adresa + `/kandidat-oglas-delete/${id}`;

    return this.httpClient.delete<any>(url);
  }
}

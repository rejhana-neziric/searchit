import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";

@Injectable({providedIn: "root"})
export class KompanijaDeleteEndpoint implements MyBaseEndpoint<string, any> {
  constructor(private httpClient: HttpClient) {
  }

  obradi(id: string): Observable<any> {
    let url = MojConfig.lokalna_adresa + `/kompanija-delete/${id}`;

    return this.httpClient.delete<any>(url);
  }
}

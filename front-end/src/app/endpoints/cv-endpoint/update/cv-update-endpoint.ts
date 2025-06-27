import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {CvUpdateRequest} from "./cv-update-request";

@Injectable({providedIn: "root"})
export class CVUpdateEndpoint implements MyBaseEndpoint<CvUpdateRequest, number> {
  constructor(private httpClient: HttpClient) {
  }

  obradi(request: CvUpdateRequest): Observable<number> {
    let url = MojConfig.lokalna_adresa + `/cv-update`;

    return this.httpClient.put<number>(url, request);
  }

}

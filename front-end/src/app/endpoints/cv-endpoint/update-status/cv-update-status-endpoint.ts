import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {CvUpdateRequest} from "../update/cv-update-request";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {CvUpdateStatusRequest} from "./cv-update-status-request";

@Injectable({providedIn: "root"})
export class CvUpdateStatusEndpoint implements MyBaseEndpoint<CvUpdateStatusRequest, number> {
  constructor(private httpClient: HttpClient) {
  }

  obradi(request: CvUpdateStatusRequest): Observable<number> {
    let url = MojConfig.lokalna_adresa + `/cv-update-status`;

    return this.httpClient.put<number>(url, request);
  }
}

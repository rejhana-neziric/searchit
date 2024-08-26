import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {CvDodajRequest} from "./cv-dodaj-request";

@Injectable({providedIn: 'root'})
export class CVDodajEndpoint implements MyBaseEndpoint<CvDodajRequest, number>{
  constructor(public httpClient: HttpClient) {
  }

  obradi(request: CvDodajRequest): Observable<number> {
    let url = MojConfig.lokalna_adresa + `/cv-dodaj`;

    return this.httpClient.post<number>(url, request);
  }
}

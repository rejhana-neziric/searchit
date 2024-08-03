import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {GetBrojZaposlenihResponse} from "./get-broj-zaposlenih-response";
import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {MojConfig} from "../../../moj-config";


@Injectable({providedIn: 'root'})
export class GetBrojZaposlenihEndpoint implements MyBaseEndpoint<void, GetBrojZaposlenihResponse> {

  constructor(public httpClient: HttpClient) { }

  obradi(request: void): Observable<GetBrojZaposlenihResponse> {
    let url = MojConfig.lokalna_adresa + `/broj-zaposlenih`;

    return this.httpClient.get<GetBrojZaposlenihResponse>(url);
  }
}

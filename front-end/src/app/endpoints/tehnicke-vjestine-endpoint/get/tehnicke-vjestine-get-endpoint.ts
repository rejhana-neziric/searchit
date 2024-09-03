import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {GetTehnickeVjestineResponse} from "./tehnicke-vjestine-get-response";

@Injectable({providedIn: 'root'})
export class GetTehnickeVjestineEndpoint implements MyBaseEndpoint<void, GetTehnickeVjestineResponse> {

  constructor(public httpClient: HttpClient) { }

  obradi(request: void): Observable<GetTehnickeVjestineResponse> {
    let url = MojConfig.lokalna_adresa + `/tehnicke-vjestine-get`;

    return this.httpClient.get<GetTehnickeVjestineResponse>(url);
  }
}

import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {GetVjestineResponse} from "./get-vjestine-response";

@Injectable({providedIn: 'root'})
export class GetVjestineEndpoint implements MyBaseEndpoint<void, GetVjestineResponse> {

  constructor(public httpClient: HttpClient) { }

  obradi(request: void): Observable<GetVjestineResponse> {
    let url = MojConfig.lokalna_adresa + `/vjestine-get`;

    return this.httpClient.get<GetVjestineResponse>(url);
  }
}

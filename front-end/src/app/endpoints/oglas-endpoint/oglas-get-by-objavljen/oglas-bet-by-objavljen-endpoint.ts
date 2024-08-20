import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {OglasGetByObjavljenResponse} from "./oglas-get-by-objavljen-response";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OglasGetResponse} from "../get/oglas-get-response";
import {MojConfig} from "../../../moj-config";

@Injectable({providedIn: 'root'})
export class OglasGetByIdEndpoint implements MyBaseEndpoint<boolean, OglasGetByObjavljenResponse> {
  constructor(public httpClient: HttpClient) { }

  obradi(objavljen: boolean): Observable<OglasGetByObjavljenResponse> {
    let url = MojConfig.lokalna_adresa + `/oglas/get-by-objavljen/${objavljen}`;

    return this.httpClient.get<OglasGetByObjavljenResponse>(url);
  }

}

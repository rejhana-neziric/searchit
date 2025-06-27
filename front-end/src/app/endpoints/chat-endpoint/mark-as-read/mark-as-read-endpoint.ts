import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {PorukaMarkAsReadRequest} from "./mark-as-read-request";
import {PorukaMarkAsReadResponse} from "./mark-as-read-response";

@Injectable({providedIn:'root'})
export class PorukaMarkAsReadEndpoint implements MyBaseEndpoint<PorukaMarkAsReadRequest, PorukaMarkAsReadResponse>
{
  constructor(private httpClient:HttpClient) {
  }

  obradi(request: PorukaMarkAsReadRequest):Observable<PorukaMarkAsReadResponse>
  {
    let url = MojConfig.lokalna_adresa + '/mark-as-read';
    return this.httpClient.put<PorukaMarkAsReadResponse>(url, request);
  }
}

import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {PorukaSendRequest} from "./poruka-send-request";
import { HttpClientModule } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PorukaSendEndpoint implements MyBaseEndpoint<PorukaSendRequest, number>
{
  constructor(private httpClient: HttpClient) {
  }

  obradi(request: PorukaSendRequest):Observable<number>
  {
    let url = MojConfig.lokalna_adresa + '/poruka-send';

    return this.httpClient.post<number>(url,request);
  }
}

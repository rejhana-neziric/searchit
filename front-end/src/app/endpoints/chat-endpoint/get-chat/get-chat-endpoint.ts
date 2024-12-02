import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import {PorukaGetChatResponse} from "./get-chat-response"
import {PorukaGetChatRequest} from "./get-chat-request"

@Injectable({providedIn: "root"})
export class PorukeGetChatEndpoint implements MyBaseEndpoint<PorukaGetChatRequest, PorukaGetChatResponse> {
  constructor(public httpClient: HttpClient) {
  }

  obradi(request: PorukaGetChatRequest): Observable<PorukaGetChatResponse> {
    const url = MojConfig.lokalna_adresa + '/chat';

    const params = new HttpParams()
      .set('korisnik1_id', request.korisnik1_id.toString())
      .set('korisnik2_id', request.korisnik2_id.toString());

    return this.httpClient.get<PorukaGetChatResponse>(url, { params });
  }
}

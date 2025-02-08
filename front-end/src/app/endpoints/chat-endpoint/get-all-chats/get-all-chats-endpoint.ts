import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MojConfig} from "../../../moj-config";
import{PorukaGetAllChatsResponse} from "./get-all-chats-response";

@Injectable({providedIn: "root"})
export class PorukaGetAllChatsEndpoint implements MyBaseEndpoint<string, PorukaGetAllChatsResponse>
{
    constructor(public httpClient: HttpClient) {
    }

    obradi(id:string):Observable<PorukaGetAllChatsResponse>
    {
        let url = MojConfig.lokalna_adresa + `/all-chats/${id}`;

        return this.httpClient.get<PorukaGetAllChatsResponse>(url);
    }
}

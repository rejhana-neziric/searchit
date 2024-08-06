import {MyBaseEndpoint} from "../MyBaseEndpoint";
import {RecenzijaGetResponse} from "./recenzija-get-response";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../../moj-config";
import {Injectable} from "@angular/core";
@Injectable({providedIn: 'root'})

export class RecenzijaGetEndpoint implements MyBaseEndpoint<void, RecenzijaGetResponse>{

    constructor(private httpKlijent:HttpClient) {
    }
    obradi(request: void): Observable<RecenzijaGetResponse> {
        let url = MojConfig.lokalna_adresa+'/recenzije-pretraga';

        return this.httpKlijent.get<RecenzijaGetResponse>(url);
    }

}

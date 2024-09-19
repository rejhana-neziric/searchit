import {Injectable} from "@angular/core";
import {MyBaseEndpoint} from "../../MyBaseEndpoint";
import {KandidatUpdateRequest} from "../update/kandidat-update-request";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {MojConfig} from "../../../moj-config";

@Injectable({providedIn: "root"})
export class KandidatDeleteEndpoint implements MyBaseEndpoint<string, any> {
  constructor(private httpClient: HttpClient) {
  }



  obradi(id: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let url = MojConfig.lokalna_adresa + `/kandidat-delete`;

    return this.httpClient.put<any>(url, JSON.stringify(id), httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error occurred:', error);
        if (error.error) {
          console.error('Error details:', error.error);
        }
        return throwError(() => error);
      })
    );
  }

}

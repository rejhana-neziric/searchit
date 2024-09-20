import { Injectable } from '@angular/core';
import {KandidatOglasUpdateRequest} from "../endpoints/kandidat-oglas-endpoint/update/kandidat-oglas-update-request";
import {firstValueFrom, Observable} from "rxjs";
import {KandidatOglasUpdateEndpoint} from "../endpoints/kandidat-oglas-endpoint/update/kandidat-oglas-update-endpoint";
import {NotificationService} from "./notification-service";
import {OglasGetRequest} from "../endpoints/oglas-endpoint/get/oglas-get-request";
import {KompanijeGetRequest} from "../endpoints/kompanija-endpoint/get/kompanije-get-request";
import {KompanijeGetEndpoint} from "../endpoints/kompanija-endpoint/get/kompanije-get-endpoint";
import {KompanijeGetResponseKomapanija} from "../endpoints/kompanija-endpoint/get/kompanije-get-response";
import {
  KandidatSpaseneKompanijeDodajRequest
} from "../endpoints/kandidat-spasene-kompanije-endpoint/dodaj/kandidat-spasene-kompanije-dodaj-request";
import {
  KandidatSpaseneKompanijeDodajEndpoint
} from "../endpoints/kandidat-spasene-kompanije-endpoint/dodaj/kandidat-spasene-kompanije-dodaj-endpoint";
import {HttpErrorResponse} from "@angular/common/http";
import {
  KandidatSpaseneKompanijeUpdateRequest
} from "../endpoints/kandidat-spasene-kompanije-endpoint/update/kandidat-spasene-kompanije-update-request";
import {
  KandidatSpaseneKompanijeUpdateEndpoint
} from "../endpoints/kandidat-spasene-kompanije-endpoint/update/kandidat-spasene-kompanije-update-endpoint";

@Injectable({
  providedIn: 'root'
})
export class KompanijaService {

  constructor(private kandidatOglasUpdateEndpoint: KandidatOglasUpdateEndpoint,
              private kompanijeGetEndpoint: KompanijeGetEndpoint,
              private kandidatSpaseneKompanijeDodajEndpoint: KandidatSpaseneKompanijeDodajEndpoint,
              private kandidatSpaseneKompanijeUpdateEndpoint: KandidatSpaseneKompanijeUpdateEndpoint,
              private notificationService: NotificationService) { }

  async getAll(request: KompanijeGetRequest) {
    try {
      const response = await firstValueFrom(this.kompanijeGetEndpoint.obradi(request));
      return response.kompanije.$values;
    } catch (error) {
      return [];
    }
  }

  acceptApplicant(request: KandidatOglasUpdateRequest): Observable<any> {
    return new Observable<any>((observer) => {
      this.kandidatOglasUpdateEndpoint.obradi(request).subscribe({
        next: () => {
          this.notificationService.showModalNotification(true, 'Applicant accepted', 'Applicant has been successfully accepted.');
          observer.next(true);  // Notify success
          observer.complete();
        },
        error: (error) => {
          this.notificationService.addNotification({
            message: 'Sorry, there was a mistake. Please try again.',
            type: 'error'
          });
          observer.error(error);  // Notify failure
        }
      });
    });
  }


  save(request: KandidatSpaseneKompanijeDodajRequest): Observable<boolean> {

    return new Observable<boolean>(observer => {
      this.kandidatSpaseneKompanijeDodajEndpoint.obradi(request).subscribe({
        next: () => {
          this.notificationService.addNotification({ message: 'Company saved.', type: 'success' });
          observer.next(true); // Notify success
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 500) {
            // Handle any special case here if needed
            // You can implement unsaveKompanija logic if necessary
          }
          this.notificationService.addNotification({ message: `Error: ${error.message}`, type: 'error' });
          observer.next(false); // Notify failure
        }
      });
    });
  }

}

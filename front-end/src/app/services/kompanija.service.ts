import { Injectable } from '@angular/core';
import {KandidatOglasUpdateRequest} from "../endpoints/kandidat-oglas-endpoint/update/kandidat-oglas-update-request";
import {firstValueFrom, Observable} from "rxjs";
import {KandidatOglasUpdateEndpoint} from "../endpoints/kandidat-oglas-endpoint/update/kandidat-oglas-update-endpoint";
import {NotificationService} from "./notification-service";
import {KompanijeGetRequest} from "../endpoints/kompanija-endpoint/get/kompanije-get-request";
import {KompanijeGetEndpoint} from "../endpoints/kompanija-endpoint/get/kompanije-get-endpoint";
import {
  KandidatSpaseneKompanijeDodajRequest
} from "../endpoints/kandidat-spasene-kompanije-endpoint/dodaj/kandidat-spasene-kompanije-dodaj-request";
import {
  KandidatSpaseneKompanijeDodajEndpoint
} from "../endpoints/kandidat-spasene-kompanije-endpoint/dodaj/kandidat-spasene-kompanije-dodaj-endpoint";
import {HttpErrorResponse} from "@angular/common/http";
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
          observer.next(true);
          observer.complete();
        },
        error: (error) => {
          this.notificationService.addNotification({
            message: 'Sorry, there was a mistake. Please try again.',
            type: 'error'
          });
          observer.error(error);
        }
      });
    });
  }

  save(request: KandidatSpaseneKompanijeDodajRequest): Observable<boolean> {

    return new Observable<boolean>(observer => {
      this.kandidatSpaseneKompanijeDodajEndpoint.obradi(request).subscribe({
        next: () => {
          this.notificationService.addNotification({ message: 'Company saved.', type: 'success' });
          observer.next(true);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 500) {
          }
          this.notificationService.addNotification({ message: `Error: ${error.message}`, type: 'error' });
          observer.next(false);
        }
      });
    });
  }

}

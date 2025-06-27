import { Injectable } from '@angular/core';
import {OglasGetResponseOglasi} from "../endpoints/oglas-endpoint/get/oglas-get-response";
import {OglasGetEndpoint} from "../endpoints/oglas-endpoint/get/oglas-get-endpoint";
import {firstValueFrom, Observable} from "rxjs";
import {AuthService} from "./auth-service";
import {KandidatOglasDodajRequest} from "../endpoints/kandidat-oglas-endpoint/dodaj/kandidat-oglas-dodaj-request";
import {KandidatOglasDodajEndpoint} from "../endpoints/kandidat-oglas-endpoint/dodaj/kandidat-oglas-dodaj-endpoint";
import {NotificationService} from "./notification-service";
import {
  KanidatSpaseniOglasiDodajRequest
} from "../endpoints/kandidat-spaseni-oglasi-endpoint/dodaj/kanidat-spaseni-oglasi-dodaj-request";
import {
  KandidatSpaseniOglasiDodajEndpoint
} from "../endpoints/kandidat-spaseni-oglasi-endpoint/dodaj/kandidat-spaseni-oglasi-dodaj-endpoint";
import {HttpErrorResponse} from "@angular/common/http";
import {
  KandidatSpaseniOglasiUpdateEndpoint
} from "../endpoints/kandidat-spaseni-oglasi-endpoint/update/kandidat-spaseni-oglasi-update-endpoint";
import {OglasGetRequest} from "../endpoints/oglas-endpoint/get/oglas-get-request";

@Injectable({
  providedIn: 'root'
})
export class OglasiService {

  constructor(private oglasGetEndpoint: OglasGetEndpoint,
              private kandidatOglasDodajEndpoint: KandidatOglasDodajEndpoint,
              private kandidatSpaseniOglasiDodajEndpoint: KandidatSpaseniOglasiDodajEndpoint,
              private kandidatSpaseniOglasiUpdateEndpoint: KandidatSpaseniOglasiUpdateEndpoint,
              private authService: AuthService,
              private notificationService: NotificationService) {

  }

  async getAll(request: OglasGetRequest) {
    try {
      const response = await firstValueFrom(this.oglasGetEndpoint.obradi(request));
      return response.oglasi.$values;
    } catch (error) {
      return [];
    }
  }

  apply(request: KandidatOglasDodajRequest): void {
    this.kandidatOglasDodajEndpoint.obradi(request).subscribe({
      next: response => {
        this.notificationService.showModalNotification(true, 'Applied', 'You have successfully applied to this job.');
      },
      error: error => {
        if (error.error instanceof Object && error.error.message) {
          const errorMessage = error.error.message;
          this.notificationService.addNotification({message: errorMessage, type: 'error'});
        } else {
          const errorMessage = typeof error.error === 'string' ? error.error : 'An unknown error occurred';
          this.notificationService.addNotification({message: errorMessage, type: 'error'});
        }
      }
    });
  }

  save(oglas: OglasGetResponseOglasi): Observable<boolean> {
    const user = this.authService.getLoggedUser();

    const request: KanidatSpaseniOglasiDodajRequest = {
      oglas_id: oglas.id,
      kandidat_id: user.id
    };

    return new Observable(observer => {
      this.kandidatSpaseniOglasiDodajEndpoint.obradi(request).subscribe(
        () => {
          this.notificationService.addNotification({message: 'Post saved.', type: 'success'});
          observer.next(true);
          observer.complete();
        },
        (error: HttpErrorResponse) => {
            observer.error(error.message);
        }
      );
    });
  }
}

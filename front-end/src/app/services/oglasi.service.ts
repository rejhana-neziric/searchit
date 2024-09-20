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
  KanidatSpaseniOglasiUpdateRequest
} from "../endpoints/kandidat-spaseni-oglasi-endpoint/update/kanidat-spaseni-oglasi-update-request";
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
    const user = this.authService.getLoggedUser(); // Get current user

    const request: KanidatSpaseniOglasiDodajRequest = {
      oglas_id: oglas.id,
      kandidat_id: user.id // Use the currently logged-in user's ID
    };

    return new Observable(observer => {
      this.kandidatSpaseniOglasiDodajEndpoint.obradi(request).subscribe(
        () => {
          this.notificationService.addNotification({message: 'Post saved.', type: 'success'});
          observer.next(true);  // Notify that the operation was successful
          observer.complete();   // Complete the observable
        },
        (error: HttpErrorResponse) => {
          if (error.status === 500) {
            const unsaveResult = this.unsaveOglas(oglas); // Handle unsaving logic if needed
            if (!unsaveResult) {
              observer.error('Post could not be saved or unsaved.');
            }
          } else {
            this.notificationService.addNotification({message: `Error: ${error.message}`, type: 'error'});
            observer.error(error.message);  // Notify that the operation failed
          }
        }
      );
    });
  }

  async unsaveOglas(oglas: OglasGetResponseOglasi): Promise<void> {
    // Implement your unsaveOglas logic here as before
  }

 /* async unsaveOglas(oglas: OglasGetResponseOglasi): Promise<boolean> {
   /!* return new Observable<boolean>(observer => {
      const user = this.authService.getLoggedUser(); // Get current user

      const request: KanidatSpaseniOglasiUpdateRequest = {
        oglas_id: oglas.id,
        kandidat_id: user.id // Use the currently logged-in user's ID
      };

      this.kandidatSpaseniOglasiUpdateEndpoint.obradi(request).subscribe({
        next: () => {
          this.notificationService.addNotification({message: 'Post removed.', type: 'success'});
          observer.next(true);  // Notify success
          observer.complete();  // Complete the observable
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this.notificationService.addNotification({message: `Error: ${error.message}`, type: 'error'});
          } else {
            this.notificationService.addNotification({message: 'An unexpected error occurred.', type: 'error'});
          }
          observer.next(false); // Notify failure
          observer.complete();  // Complete the observable
        }
      });
    });*!/
  }*/
}

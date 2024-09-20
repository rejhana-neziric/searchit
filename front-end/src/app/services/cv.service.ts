import { Injectable } from '@angular/core';
import {firstValueFrom, Observable} from "rxjs";
import {AuthService} from "./auth-service";
import {CVGetEndpoint} from "../endpoints/cv-endpoint/get/cv-get-endpoint";
import {CVGetRequest} from "../endpoints/cv-endpoint/get/cv-get-request";
import {CvUpdateStatusRequest} from "../endpoints/cv-endpoint/update-status/cv-update-status-request";
import {NotificationService} from "./notification-service";
import {CvUpdateStatusEndpoint} from "../endpoints/cv-endpoint/update-status/cv-update-status-endpoint";
import {CvDeleteEndpoint} from "../endpoints/cv-endpoint/delete/cv-delete-endpoint";

@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor(private authService: AuthService,
              private notificationService: NotificationService,
              private cvGetEndpoint: CVGetEndpoint,
              private cvUpdateStatusEndpoint: CvUpdateStatusEndpoint,
              private cvDeleteEndpoint: CvDeleteEndpoint) { }

  async getAll(searchObject: CVGetRequest) {
    try {
      const response = await firstValueFrom(this.cvGetEndpoint.obradi(searchObject));
      return response.cv.$values;
    } catch (error) {
      return [];
    }
  }

  changeStatus(request: CvUpdateStatusRequest ): Observable<any> {
    return new Observable<any>((observer) => {
      this.cvUpdateStatusEndpoint.obradi(request).subscribe({
        next: () => {
          if (request.objavljen) {
            this.notificationService.addNotification({
              message: 'Your CV has been successfully published.',
              type: 'success',
            });
          } else {
            this.notificationService.addNotification({
              message: 'Your CV has been successfully unpublished.',
              type: 'success',
            });
          }

          observer.next(true);
          observer.complete();
        },
        error: (error) => {
          this.notificationService.addNotification({
            message: 'Sorry, there was a mistake. Please try again..',
            type: 'error',
          });
          observer.error(error);
        },
      });
    });
  }

  delete(cvId: number): Observable<any> {
    return new Observable<any>((observer) => {
      this.cvDeleteEndpoint.obradi(cvId).subscribe({
        next: () => {
          this.notificationService.addNotification({
            message: 'Your CV has been successfully deleted.',
            type: 'success',
          });

          observer.next(true);
          observer.complete();
        },
        error: (error) => {
          this.notificationService.addNotification({
            message: 'Sorry, there was a mistake. Please try again.',
            type: 'error',
          });

          observer.error(error);
        },
      });
    });
  }

}

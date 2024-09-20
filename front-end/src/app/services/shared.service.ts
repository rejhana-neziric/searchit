import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {AuthService} from "./auth-service";
import {NotificationService} from "./notification-service";
import {Observable} from "rxjs";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private authService: AuthService,
              private notificationService: NotificationService,
              @Inject(PLATFORM_ID) private platformId: Object) {

  }

  // Method to set the total based on the array length
  setTotal(oglasi: any[]): number {
    return oglasi.length;
  }

  // Method to handle page changes and update the current page
  pageChangeEvent($event: number, currentPage: number): number {
    return $event;  // Set the current page based on the event
  }

  // Method to smoothly scroll to the top
  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }


  toggle2FA(): Observable<any> {
    return new Observable(observer => {
      this.authService.manageTwoFactorAuthentication().subscribe({
        next: response => {
          this.notificationService.addNotification({message: response.message, type: 'success'});
          observer.next(true);  // Notify that the operation was successful
        },
        error: error => {
          let errorMessage = 'An unknown error occurred';
          if (error.error instanceof Object && error.error.message) {
            errorMessage = error.error.message;
          } else if (typeof error.error === 'string') {
            errorMessage = error.error;
          }
          this.notificationService.addNotification({message: errorMessage, type: 'error'});
          observer.error(errorMessage);  // Notify that the operation failed
        }
      });
    });
  }

  // Function to confirm the verification code
  confirmVerificationCode(token: string): Observable<any> {
    return new Observable(observer => {
      this.authService.changeTwoFactorAuthentication(token).subscribe({
        next: response => {
          this.notificationService.showModalNotification(true, 'Changes saved', response.message);
          observer.next(true);  // Operation successful
        },
        error: error => {
          let errorMessage = 'An unknown error occurred';
          if (error.error instanceof Object && error.error.message) {
            errorMessage = error.error.message;
          } else if (typeof error.error === 'string') {
            errorMessage = error.error;
          }
          this.notificationService.addNotification({message: errorMessage, type: 'error'});
          observer.error(errorMessage);  // Operation failed
        }
      });
    });
  }
}

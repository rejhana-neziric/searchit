import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

declare var bootstrap: any;

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
  }

  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();
  private idCounter = 0;

  addNotification(notification: Omit<Notification, 'id'>) {
    const newNotification: Notification = {
      ...notification,
      id: this.idCounter++
    };
    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, newNotification]);
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.removeNotification(newNotification.id);
      }, 4000);
    }
  }

  removeNotification(notificationId: number) {
    const currentNotifications = this.notificationsSubject.value.filter(
      n => n.id !== notificationId
    );
    this.notificationsSubject.next(currentNotifications);
  }

  private notificationModalSubject = new BehaviorSubject<{ isSuccess: boolean, title: string, message: string } | null>(null);

  notificationModal$ = this.notificationModalSubject.asObservable();

  showModalNotification(isSuccess: boolean, title: string, message: string) {
    this.notificationModalSubject.next({ isSuccess, title, message });
  }

  clearModalNotification() {
    this.notificationModalSubject.next(null);
  }
}

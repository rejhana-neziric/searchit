import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
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

    setTimeout(() => {
      this.removeNotification(newNotification.id);
    }, 4000);
  }

  removeNotification(notificationId: number) {
    const currentNotifications = this.notificationsSubject.value.filter(
      n => n.id !== notificationId
    );
    this.notificationsSubject.next(currentNotifications);
  }
}

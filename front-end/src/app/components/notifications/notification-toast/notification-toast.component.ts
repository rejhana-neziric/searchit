import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../../services/notification-service";
import {Notification} from "../../../services/notification-service";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-notification-toast',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './notification-toast.component.html',
  styleUrl: './notification-toast.component.css'
})
export class NotificationToastComponent implements OnInit{
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notifications$.subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  removeNotification(id: number) {
    this.notificationService.removeNotification(id);
  }
}

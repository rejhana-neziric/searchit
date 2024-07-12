import {Component, Injectable, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {NotificationService} from "./notification-service";
import {Notification} from "./notification-service";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit{
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

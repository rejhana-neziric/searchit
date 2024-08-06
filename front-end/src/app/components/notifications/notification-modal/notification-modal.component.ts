import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {Subscription} from "rxjs";
import {NotificationService} from "../../../services/notification-service";
import {NgClass} from "@angular/common";
import { isPlatformBrowser } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-notification-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    NgClass
  ],
  templateUrl: './notification-modal.component.html',
  styleUrl: './notification-modal.component.css'
})
export class NotificationModalComponent implements  OnInit{
  notification: { isSuccess: boolean, title: string, message: string } | null = null;
  private subscription: Subscription | undefined;

  constructor(private notificationService: NotificationService,
              @Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit(): void {
    this.subscription = this.notificationService.notificationModal$.subscribe(notification => {
      if (notification) {
        this.notification = notification;
        this.showModal();
      } else {
        this.hideModal();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private showModal(): void {
    if (isPlatformBrowser(this.platformId)) {
      const modalElement = document.getElementById('notificationModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  private hideModal(): void {
    if (isPlatformBrowser(this.platformId)) {

      const modalElement = document.getElementById('notificationModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal?.hide();
      }
    }
  }
}

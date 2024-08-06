import {Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OglasiComponent } from "./components/oglasi/oglasi.component";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { JeziciComponent } from "./jezici/jezici.component";
import { httpInterceptorProviders } from './Helpers/HttpRequestInterceptor';
import { isPlatformBrowser } from '@angular/common';
import {AuthService} from "./services/auth-service";
import {JwtInterceptor} from "./interceptors/jwt.interceptor";
import {NotificationModalComponent} from "./components/notifications/notification-modal/notification-modal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    HttpClientModule,
    OglasiComponent,
    JeziciComponent,
    NotificationModalComponent,],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private router: Router,
              @Inject(PLATFORM_ID) private platformId: Object,
              private authService: AuthService)
  {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          window.scrollTo(0, 0);
        }
      });
    }

    this.refreshUser();
  }

  private refreshUser() {
    const jwt = this.authService.getJWT();
    if (jwt) {
      this.authService.refreshUser(jwt).subscribe({
        next: _ => {
        },
        error: error => {
          this.authService.logout();
        }
      })
    } else {
      this.authService.refreshUser(null).subscribe();
    }
  }
}

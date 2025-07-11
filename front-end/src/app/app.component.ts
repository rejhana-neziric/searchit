// import {Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
// import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { OglasiComponent } from "./components/jobs/oglasi/oglasi.component";
// import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
// //import { httpInterceptorProviders } from './Helpers/HttpRequestInterceptor';
// import { isPlatformBrowser } from '@angular/common';
// import {AuthService} from "./services/auth-service";
// import {JwtInterceptor} from "./interceptors/jwt.interceptor";
// import {NotificationModalComponent} from "./components/notifications/notification-modal/notification-modal.component";
// import {HomeComponent} from "./components/home/home.component";
// import {OglasDodajComponent} from "./components/jobs/oglas-dodaj/oglas-dodaj.component";
// import {OglasiDraftComponent} from "./components/jobs/oglasi-draft/oglasi-draft.component";
// import {ChatCandidateComponent} from "./components/chat/chat-candidate/chat-candidate.component";
//
// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterOutlet,
//     ReactiveFormsModule,
//     FormsModule,
//     RouterLink,
//     HttpClientModule,
//     OglasiComponent,
//     NotificationModalComponent,
//     OglasDodajComponent,
//     OglasiDraftComponent,
//     ChatCandidateComponent,
//   ],
//   providers: [],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent implements OnInit{
//   constructor(private router: Router,
//               @Inject(PLATFORM_ID) private platformId: Object,
//               private authService: AuthService)
//   {}
//
//   ngOnInit(): void {
//     if (isPlatformBrowser(this.platformId)) {
//       this.router.events.subscribe((event) => {
//         if (event instanceof NavigationEnd) {
//           window.scrollTo(0, 0);
//         }
//       });
//     }
//
//     this.refreshUser();
//   }
//
//   private refreshUser() {
//     const jwt = this.authService.getJWT();
//     if (jwt) {
//       this.authService.refreshUser(jwt).subscribe({
//         next: _ => {
//         },
//         error: error => {
//           this.authService.logout();
//         }
//       })
//     } else {
//       this.authService.refreshUser(null).subscribe();
//     }
//   }
// }
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "./services/auth-service";
import { OglasiComponent } from "./components/jobs/oglasi/oglasi.component";
import { NotificationModalComponent } from "./components/notifications/notification-modal/notification-modal.component";
import { OglasDodajComponent } from "./components/jobs/oglas-dodaj/oglas-dodaj.component";
import { OglasiDraftComponent } from "./components/jobs/oglasi-draft/oglasi-draft.component";
import { ChatCandidateComponent } from "./components/chat/chat-candidate/chat-candidate.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
    NotificationModalComponent,
    OglasDodajComponent,
    OglasiDraftComponent,
    ChatCandidateComponent,
    TranslateModule
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private translate: TranslateService
  ) {

    this.translate.addLangs(['en', 'bs']);
    this.translate.setDefaultLang('en');

    this.translate.use('en');
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Osiguraj da stranica bude uvijek pomaknuta na vrh pri navigaciji
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          window.scrollTo(0, 0);
        }
      });
    }

    // Pozivanje funkcije za osvježavanje korisnika
    this.refreshUser();
  }

  private refreshUser() {
    const jwt = this.authService.getJWT();
    if (jwt) {
      this.authService.refreshUser(jwt).subscribe({
        next: _ => {},
        error: error => {
          this.authService.logout();
        }
      })
    } else {
      this.authService.refreshUser(null).subscribe();
    }
  }

  // Funkcija za promjenu jezika
  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}

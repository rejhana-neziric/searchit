import {Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OglasiComponent } from "./components/oglasi/oglasi.component";
import { HttpClient, HttpClientModule} from "@angular/common/http";
import { JeziciComponent } from "./jezici/jezici.component";
import { httpInterceptorProviders } from './Helpers/HttpRequestInterceptor';
import { isPlatformBrowser } from '@angular/common';
import {HomeComponent} from "./components/home/home.component";
import {OglasDodajComponent} from "./components/oglas-dodaj/oglas-dodaj.component";

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
    HomeComponent,
    OglasDodajComponent
  ],
  providers: [httpInterceptorProviders],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private router: Router,
              @Inject(PLATFORM_ID) private platformId: Object)
  {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          window.scrollTo(0, 0);
        }
      });
    }
  }
}

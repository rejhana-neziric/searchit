import {Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PocentaKandidatComponent } from "./components/kandidat/pocenta-kandidat/pocenta-kandidat.component";
import {
  PocetnaNeregistrovaniKorisnikComponent
} from "./components/pocetna-neregistrovani-korisnik/pocetna-neregistrovani-korisnik.component";
import { HttpClient, HttpClientModule} from "@angular/common/http";
import { JeziciComponent } from "./jezici/jezici.component";
import { httpInterceptorProviders } from './Helpers/HttpRequestInterceptor';
import { isPlatformBrowser } from '@angular/common';

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
    PocentaKandidatComponent,
    PocetnaNeregistrovaniKorisnikComponent,
    JeziciComponent],
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

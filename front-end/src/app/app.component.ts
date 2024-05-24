import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {PocentaKandidatComponent} from "./components/pocenta-kandidat/pocenta-kandidat.component";
import {
  PocetnaNeregistrovaniKorisnikComponent
} from "./components/pocetna-neregistrovani-korisnik/pocetna-neregistrovani-korisnik.component";
import {LoginComponent} from "./components/login/login.component";
import {HttpClient} from "@angular/common/http";
import {JeziciComponent} from "./jezici/jezici.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, RouterLink, PocentaKandidatComponent, PocetnaNeregistrovaniKorisnikComponent, LoginComponent, JeziciComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private router: Router, private httpKlijent: HttpClient) {
  }

  ngOnInit(): void {

  }
}

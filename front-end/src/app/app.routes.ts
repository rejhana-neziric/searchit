import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {
  PocetnaNeregistrovaniKorisnikComponent
} from "./components/pocetna-neregistrovani-korisnik/pocetna-neregistrovani-korisnik.component";
import {PocentaKandidatComponent} from "./components/pocenta-kandidat/pocenta-kandidat.component";

export const routes: Routes = [
  {path: 'home', component: PocetnaNeregistrovaniKorisnikComponent},
  {path: 'home-kandidat', component: PocentaKandidatComponent},
  {path: 'login', component: LoginComponent}
];

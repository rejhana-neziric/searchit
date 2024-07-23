import {RouterModule, Routes} from '@angular/router';
import {
  PocetnaNeregistrovaniKorisnikComponent
} from "./components/pocetna-neregistrovani-korisnik/pocetna-neregistrovani-korisnik.component";
import {PocentaKandidatComponent} from "./components/kandidat/pocenta-kandidat/pocenta-kandidat.component";
import {OglasDetaljiComponent} from "./components/oglas-detalji/oglas-detalji.component";
import {FavoritesComponent} from "./components/kandidat/favorites/favorites.component";
import {NgModule} from "@angular/core";
import {KompanijePregledComponent} from "./components/kompanije-pregled/kompanije-pregled.component";
import {KompanijaDetaljiComponent} from "./components/kompanija-detalji/kompanija-detalji.component";
import {HomeComponent} from "./components/home/home.component";
import {BrowserModule} from "@angular/platform-browser";
import { HttpClientModule} from "@angular/common/http";
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup-general/signup.component";
import {SignupKandidatComponent} from "./components/signup/signup-kandidat/signup-kandidat.component";
import {SignupKompanijaComponent} from "./components/signup/signup-kompanija/signup-kompanija.component";

export const routes: Routes = [
  {path: 'home-neregistorvani', component: PocetnaNeregistrovaniKorisnikComponent},
  {path: 'home-kandidat', component: PocentaKandidatComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signup-kandidat', component: SignupKandidatComponent},
  {path: 'signup-kompanija', component: SignupKompanijaComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'oglasi/:id', component: OglasDetaljiComponent},
  {path: 'kompanije', component: KompanijePregledComponent},
  {path: 'kompanije/:id', component: KompanijaDetaljiComponent},
  {path: 'home', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  }),
    BrowserModule,
    HttpClientModule,],
  exports: [RouterModule]
})

export class AppRoutingModule { }

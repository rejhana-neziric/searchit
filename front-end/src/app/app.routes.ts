import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {
  PocetnaNeregistrovaniKorisnikComponent
} from "./components/pocetna-neregistrovani-korisnik/pocetna-neregistrovani-korisnik.component";
import {PocentaKandidatComponent} from "./components/kandidat/pocenta-kandidat/pocenta-kandidat.component";
import {OglasDetaljiComponent} from "./components/oglas-detalji/oglas-detalji.component";
import {FavoritesComponent} from "./components/kandidat/favorites/favorites.component";
import {NgModule} from "@angular/core";
import {OglasiPregledComponent} from "./components/oglasi-pregled/oglasi-pregled.component";
import {KompanijePregledComponent} from "./components/kompanije-pregled/kompanije-pregled.component";
import {KompanijaDetaljiComponent} from "./components/kompanija-detalji/kompanija-detalji.component";

export const routes: Routes = [
  {path: 'home', component: PocetnaNeregistrovaniKorisnikComponent},
  {path: 'home-kandidat', component: PocentaKandidatComponent},
  {path: 'login', component: LoginComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'oglasi/:id', component: OglasDetaljiComponent},
  {path: 'kompanije', component: KompanijePregledComponent},
  {path: 'kompanije/:id', component: KompanijaDetaljiComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }

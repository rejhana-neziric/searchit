import {RouterModule, Routes} from '@angular/router';
import {OglasiComponent} from "./components/oglasi/oglasi.component";
import {OglasDetaljiComponent} from "./components/oglas-detalji/oglas-detalji.component";
import {FavoritesComponent} from "./components/kandidat/favorites/favorites.component";
import {NgModule} from "@angular/core";
import {KompanijeComponent} from "./components/kompanije/kompanije.component";
import {KompanijaDetaljiComponent} from "./components/kompanija-detalji/kompanija-detalji.component";
import {HomeComponent} from "./components/home/home.component";
import {BrowserModule} from "@angular/platform-browser";
import { HttpClientModule} from "@angular/common/http";
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup-general/signup.component";
import {CvComponent} from "./components/kandidat/cv/cv.component";
import {CreateCvComponent} from "./components/kandidat/create-cv/create-cv.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: HomeComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'jobs', component: OglasiComponent},
  {path: 'jobs/:id', component: OglasDetaljiComponent},
  {path: 'companies', component: KompanijeComponent},
  {path: 'companies/:id', component: KompanijaDetaljiComponent},
  {path: 'cv', component: CvComponent},
  {path: 'cv-create', component: CreateCvComponent},
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

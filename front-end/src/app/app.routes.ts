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
import {AuthorizationGuard} from "./guards/authorization.guard";
import {NotificationModalComponent} from "./components/notifications/notification-modal/notification-modal.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {ConfirmEmailComponent} from "./components/confirm-email/confirm-email.component";
import {SendEmailComponent} from "./components/send-email/send-email.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthorizationGuard],
    children: [
      //dodati rute koje zahtijevaju login
    ]
  },

  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'confirm-email', component: ConfirmEmailComponent},
  {path: 'send-email/:mode', component: SendEmailComponent},
  {path: 'home', component: HomeComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'jobs', component: OglasiComponent},
  {path: 'jobs/:id', component: OglasDetaljiComponent},
  {path: 'companies', component: KompanijeComponent},
  {path: 'companies/:id', component: KompanijaDetaljiComponent},
  {path: 'cv', component: CvComponent},
  {path: 'cv-create', component: CreateCvComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'}
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

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
import {OglasDodajComponent} from "./components/oglas-dodaj/oglas-dodaj.component";
import {
  AccountDetailsCandidateComponent
} from "./components/account/account-details-candidate/account-details-candidate.component";
import {
  AccountDetailsCompanyComponent
} from "./components/account/account-details-company/account-details-company.component";
import {OglasiDraftComponent} from "./components/oglasi-draft/oglasi-draft.component";
import {CvPreviewComponent} from "./components/kandidat/cv-preview/cv-preview.component";
import {CvDetailsComponent} from "./components/kandidat/cv-details/cv-details.component";
import { ApplicationsComponent } from "./components/kandidat/applications/applications.component";
import { ApplicantsComponent } from "./components/company/applicants/applicants.component";
import { FavoritesKandidatiComponent } from "./components/company/favorites-kandidati/favorites-kandidati.component";
import { CvPublishedComponent } from "./components/company/cv-published/cv-published.component";
import { ChatCompanyComponent } from "./components/company/chat-company/chat-company.component";
import { MyJobsComponent } from "./components/company/my-jobs/my-jobs.component";
import { OglasUpdateComponent } from "./components/oglas-update/oglas-update.component";
import {
  TwoFactorAuthenticationComponent
} from "./components/two-factor-authentication/two-factor-authentication.component";
import {ForbiddenComponent} from "./components/forbidden/forbidden.component";


export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  { path: '',
    component: HomeComponent
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'confirm-email',
    component: ConfirmEmailComponent
  },
  {
    path: 'send-email/:mode',
    component: SendEmailComponent
  },
  {
    path: '2fa',
    component: TwoFactorAuthenticationComponent
  },
  {
    path: 'my-jobs',
    component: MyJobsComponent,
    canActivate: [AuthorizationGuard],
    data: { roles: ['Kompanija'] }
  },
  { path: 'jobs',
    component: OglasiComponent
  },
  {
    path: 'jobs/:id',
    component: OglasDetaljiComponent
  },
  { path: 'jobs-add',
    component: OglasDodajComponent,
    canActivate: [AuthorizationGuard],
    data: { roles: ['Admin','Kompanija'] }
  },
  {
    path: 'companies',
    component: KompanijeComponent
  },
  {
    path: 'companies/:id',
    component: KompanijaDetaljiComponent
  },
  {
    path: 'job-drafts',
    component: OglasiDraftComponent
  },
  {
    path: 'edit-job/:id',
    component: OglasUpdateComponent,
    canActivate: [AuthorizationGuard],
    data: { roles: ['Admin','Kompanija'] }
  },
  {
    path: 'account-candidate',
    component: AccountDetailsCandidateComponent,
    canActivate: [AuthorizationGuard],
    data: { roles: ['Kandidat'] }
  },
  {
    path: 'account-company',
    component: AccountDetailsCompanyComponent,
    canActivate: [AuthorizationGuard],
    data: { roles: ['Kompanija'] }
  },
  {
    path: 'cv',
    component: CvComponent,
    canActivate: [AuthorizationGuard],
    data: { roles: ['Admin', 'Kandidat'] }
  },
  {
    path: 'cv-create',
    component: CreateCvComponent,
    canActivate: [AuthorizationGuard],
    data: { roles: ['Admin', 'Kandidat'] }
  },
  {
    path: 'cv-create/:id',
    component: CreateCvComponent,
    canActivate: [AuthorizationGuard],
    data: { roles: ['Admin', 'Kandidat'] }
  },
  { path: 'cv-preview',
    component: CvPreviewComponent,
    canActivate: [AuthorizationGuard],
    data: { roles: ['Admin', 'Kandidat'] }
  },
  {
    path: 'cv-preview/:id',
    component: CvPreviewComponent,
    canActivate: [AuthorizationGuard],
    data: { roles: ['Admin', 'Kandidat'] }
  },
  {
    path: 'cv-details/:id',
    component: CvDetailsComponent,
    canActivate: [AuthorizationGuard],
    data: { roles: ['Admin', 'Kandidat', 'Kompanija'] }
  },
  {
    path: 'cvs',
    component: CvPublishedComponent,
    canActivate: [AuthorizationGuard],
    data: { roles: ['Admin', 'Kompanija'] }
  },
  {
    path: 'applications',
    component: ApplicationsComponent,
    canActivate: [AuthorizationGuard],
    data: { roles: ['Kandidat'] }
  },
  {
    path: 'applicants',
    component: ApplicantsComponent,
    canActivate: [AuthorizationGuard],
    data: { roles: ['Kompanija'] }
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthorizationGuard],
    data: { roles: ['Kandidat'] }
  },
  {
    path: 'favorites-applicants',
    component: FavoritesKandidatiComponent,
    canActivate: [AuthorizationGuard],
    data: { roles: ['Kompanija'] }
  },
  {
    path: 'chat',
    component: ChatCompanyComponent,
    canActivate: [AuthorizationGuard],
    data: { roles: ['Admin', 'Kompanija', 'Kandidat'] }
  },
  { path: 'not-found',
    component: NotFoundComponent
  },
  { path: '**',
    component: NotFoundComponent,
  },
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

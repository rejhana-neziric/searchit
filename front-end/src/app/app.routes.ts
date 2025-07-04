import {RouterModule, Routes} from '@angular/router';
import {OglasiComponent} from "./components/jobs/oglasi/oglasi.component";
import {OglasDetaljiComponent} from "./components/jobs/oglas-detalji/oglas-detalji.component";
import {FavoritesComponent} from "./components/saved/favorites/favorites.component";
import {NgModule} from "@angular/core";
import {KompanijeComponent} from "./components/companies/kompanije/kompanije.component";
import {KompanijaDetaljiComponent} from "./components/companies/kompanija-detalji/kompanija-detalji.component";
import {HomeComponent} from "./components/home/home.component";
import {BrowserModule} from "@angular/platform-browser";
import { HttpClientModule} from "@angular/common/http";
import {LoginComponent} from "./components/auth/login/login.component";
import {SignupComponent} from "./components/auth/signup/signup-general/signup.component";
import {CvComponent} from "./components/cv/cv/cv.component";
import {CreateCvComponent} from "./components/cv/cv-create/create-cv.component";
import {AuthorizationGuard} from "./guards/authorization.guard";
import {NotificationModalComponent} from "./components/notifications/notification-modal/notification-modal.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {ConfirmEmailComponent} from "./components/auth/confirm-email/confirm-email.component";
import {SendEmailComponent} from "./components/auth/send-email/send-email.component";
import {OglasDodajComponent} from "./components/jobs/oglas-dodaj/oglas-dodaj.component";
import {
  AccountDetailsCandidateComponent
} from "./components/account/account-details-candidate/account-details-candidate.component";
import {
  AccountDetailsCompanyComponent
} from "./components/account/account-details-company/account-details-company.component";
import {OglasiDraftComponent} from "./components/jobs/oglasi-draft/oglasi-draft.component";
import {CvPreviewComponent} from "./components/cv/cv-preview/cv-preview.component";
import {CvDetailsComponent} from "./components/cv/cv-details/cv-details.component";
import { ApplicationsComponent } from "./components/applications/applications.component";
import { ApplicantsComponent } from "./components/applicants/applicants.component";
import { FavoritesKandidatiComponent } from "./components/saved/favorites-kandidati/favorites-kandidati.component";
import { CvPublishedComponent } from "./components/cv/cv-published/cv-published.component";
import { ChatCompanyComponent } from "./components/chat/chat-company/chat-company.component";
import { MyJobsComponent } from "./components/jobs/my-jobs/my-jobs.component";
import { OglasUpdateComponent } from "./components/jobs/oglas-update/oglas-update.component";
import {
  TwoFactorAuthenticationComponent
} from "./components/auth/two-factor-authentication/two-factor-authentication.component";
import {ForbiddenComponent} from "./components/forbidden/forbidden.component";
import {DashboardComponent} from "./components/admin-panel/dashboard/dashboard.component";
import {UsersComponent} from "./components/admin-panel/users/users.component";
import {AutofillMonitor} from "@angular/cdk/text-field";
import {ChatCandidateComponent} from "./components/chat/chat-candidate/chat-candidate.component";
import {ChatAllComponent} from "./components/chat/chat-all/chat-all.component";
import {
  UserCandidatesEditComponent
} from "./components/admin-panel/users/user-candidates-edit/user-candidates-edit.component";
import {
  UserCompaniesEditComponent
} from "./components/admin-panel/users/user-companies-edit/user-companies-edit.component";
import {ChatsComponent} from "./components/chat/chats/chats.component";


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
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthorizationGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthorizationGuard],
    data: { roles: ['Admin'] }
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
    path: 'my-drafts',
    component: OglasiDraftComponent,
    canActivate: [AuthorizationGuard],
    data: {roles: ['Admin', 'Kompanija']}
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
    component: ChatAllComponent,
    canActivate: [AuthorizationGuard],
    data: { roles: ['Admin', 'Kompanija', 'Kandidat'] }
  },
  {
    path: 'messages',
    component: ChatsComponent,
    canActivate: [AuthorizationGuard],
    data: {roles: ['Admin', 'Kandidat', 'Kompanija']}
  },
  {
    path:'candidates-edit/:id',
    component: UserCandidatesEditComponent,
    canActivate: [AuthorizationGuard],
    data: {roles: ['Admin']}
  },
  {
    path:'companies-edit/:id',
    component: UserCompaniesEditComponent,
    canActivate: [AuthorizationGuard],
    data: {roles: ['Admin']}
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

import {ApplicationConfig, NgModule} from '@angular/core';
import { provideRouter } from '@angular/router';
import {AppRoutingModule, routes} from './app.routes';
import {BrowserModule, provideClientHydration} from "@angular/platform-browser";
import { provideHttpClient} from "@angular/common/http";
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MatPaginatorModule} from "@angular/material/paginator";
import { NgxPaginationModule } from "ngx-pagination";
import { provideAnimations } from '@angular/platform-browser/animations';
import {AppComponent} from "./app.component";
import bootstrap from '../main.server';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              //provideClientHydration(),
              provideHttpClient(),
              provideAnimations(),
  ]
};


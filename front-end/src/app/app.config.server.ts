import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideClientHydration } from "@angular/platform-browser";
import { JwtHelperService } from "@auth0/angular-jwt";

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideClientHydration(),
    JwtHelperService
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

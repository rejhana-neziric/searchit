// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes} from './app.routes';
// import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { JwtHelperService } from "@auth0/angular-jwt";
// import { JwtInterceptor } from "./interceptors/jwt.interceptor";
//
// export const appConfig: ApplicationConfig = {
//   providers: [provideRouter(routes),
//               //provideClientHydration(),
//               provideHttpClient(
//                 withFetch(),
//                 withInterceptors([JwtInterceptor])
//               ),
//               provideAnimations(),
//               JwtHelperService,
//   ]
// };
//

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { provideAnimations } from '@angular/platform-browser/animations';
import { JwtHelperService } from "@auth0/angular-jwt";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Funkcija za učitavanje JSON fajlova sa prevodima
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([JwtInterceptor])
    ),
    provideAnimations(),
    JwtHelperService,
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    )
  ]
};

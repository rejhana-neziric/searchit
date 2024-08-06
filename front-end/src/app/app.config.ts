import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes} from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { provideAnimations } from '@angular/platform-browser/animations';
import { JwtHelperService } from "@auth0/angular-jwt";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              //provideClientHydration(),
              provideHttpClient(
                withFetch(),
                withInterceptors([JwtInterceptor])
              ),
              provideAnimations(),
              JwtHelperService,
  ]
};


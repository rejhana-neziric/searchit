import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration} from "@angular/platform-browser";
import { provideHttpClient} from "@angular/common/http";
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MatPaginatorModule} from "@angular/material/paginator";
import { NgxPaginationModule } from "ngx-pagination";
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              //provideClientHydration(),
              provideHttpClient(),
              provideAnimations(),
  ]
};

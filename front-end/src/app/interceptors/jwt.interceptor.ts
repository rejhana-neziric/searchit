import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import {Observable, switchMap, take} from 'rxjs';
import {AuthService} from "../services/auth-service";
import {inject} from "@angular/core";

export const JwtInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);

  return authService.user$.pipe(
    take(1),
    switchMap(user => {
      if (user) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${user.jwt}`
          }
        });
      }
      return next(request);
    })
  );
};


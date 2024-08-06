import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../services/auth-service";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {User} from "../modals/user";

@Injectable({ providedIn: 'root' })
export class AuthorizationGuard {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.authService.user$.pipe(
      map((user: User | null) => {
        if(user) {
          return true;
        } else {
          this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}})
          return false;
        }
      })
    )
  }
}

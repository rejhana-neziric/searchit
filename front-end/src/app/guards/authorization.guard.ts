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
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.user$.pipe(
      map((user: User | null) => {
        const requiredRoles = route.data['roles'] as Array<string>;

        console.log(requiredRoles)
        console.log(user?.role)
        if (user && requiredRoles && requiredRoles.includes(user.role)) {
          return true;
        } else if (user) {
          // If the user is logged in but doesn't have the required role, navigate to forbidden
          this.router.navigateByUrl('/forbidden');
          return false;
        } else {
          // If the user is not logged in, redirect to login
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
      })
    );
  }

}

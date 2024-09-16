import {Inject, Injectable, OnInit, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable, of, ReplaySubject, take} from 'rxjs';
import {MojConfig} from "../moj-config";
import {environment} from "../../environments/environment.development";
import {User} from "../modals/user";
import {response} from "express";
import {Router} from "@angular/router";
import {isPlatformBrowser} from '@angular/common';
import {ConfirmEmail} from "../modals/confirmEmail";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isBrowser: boolean;
  private userSource: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSource.asObservable();
  public userId: string | null = null;

  constructor(private http: HttpClient,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId: Object) {

    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const storedUser = localStorage.getItem(environment.userKey);
      if (storedUser) {
        this.userSource.next(JSON.parse(storedUser));
      }
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<User>(
      MojConfig.lokalna_adresa + '/login',
      {
        username,
        password,
      },
      httpOptions
    ).pipe(
      map((user: User) => {
        if (user) {
          this.setUser(user);
        }
      })
    );
  }

  sendPhoneVerificationCode(kandidatId: string) {
    return this.http.post(MojConfig.lokalna_adresa + `/send-phone-verification-code/${kandidatId}`, {});
  }

  verifyPhoneNumber(token: string) {
    return this.http.post(MojConfig.lokalna_adresa + `/verify-phone-number/${token}`, {});
  }

  getLoggedUser() {

    let loggedUser: User | null = { id: "", role: "", jwt: ""};

    this.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        loggedUser = user;
      }
    })

    return loggedUser;
  }

  registerCandidate(username: string, password: string, email: string, ime: string, prezime: string,
                    datumRodjenja: any, mjestoPrebivalista: string, zvanje: string, phoneNumber: string): Observable<any> {
    return this.http.post(
      MojConfig.lokalna_adresa + '/register/kandidat',
      {
        username,
        password,
        email,
        ime,
        prezime,
        datumRodjenja,
        mjestoPrebivalista,
        zvanje,
        phoneNumber
      },
      httpOptions
    );
  }

  registerCompany(username: string, password: string, email: string, naziv: string, godinaOsnivanja: number,
                  lokacija: string, logo: FormData | null, brojZaposlenih: string, kratkiOpis: string,
                  opis: string, website: string | null, linkedIn: string | null, twitter: string | null): Observable<any> {
    return this.http.post(
      MojConfig.lokalna_adresa + '/register/kompanija',
      {
        username,
        password,
        email,
        naziv,
        godinaOsnivanja,
        lokacija,
        logo,
        brojZaposlenih,
        kratkiOpis,
        opis,
        website,
        linkedIn,
        twitter
      },
      httpOptions
    );
  }


  confirmEmail(model: ConfirmEmail) {
    return this.http.put(MojConfig.lokalna_adresa + '/confirm-email', model);
  }

  resendEmailConfirmationLink(email: string) {
    return this.http.post(MojConfig.lokalna_adresa + `/resend-email-confirmation-link/${email}`, {});
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem(environment.userKey);
    }
    this.userSource.next(null);
    this.router.navigateByUrl('/home');
  }

  getJWT() {
    if (this.isBrowser) {
      const key = localStorage.getItem(environment.userKey);
      if (key) {
        const user: User = JSON.parse(key);
        return user.jwt;
      } else {
        return null;
      }
    }
    return null;
  }

  private setUser(user: User) {
    if (this.isBrowser) {
      localStorage.setItem(environment.userKey, JSON.stringify(user));
      this.userSource.next(user);
    }
  }

  refreshUser(jwt: string | null) {
    if (jwt === null) {
      this.userSource.next(null);
      return of(undefined);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);

    return this.http.get<User>(`${environment.appUrl}/refresh-token`, {headers}).pipe(
      map((user: User) => {
        if (user) {
          this.setUser(user);
        }
      })
    )
  }
}

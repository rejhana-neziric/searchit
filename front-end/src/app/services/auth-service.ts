import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MojConfig} from "../moj-config";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      MojConfig.lokalna_adresa + '/login',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  registerCandidate(username: string, password: string, email: string, ime: string, prezime: string,
                    datumRodjenja: any, mjestoPrebivalista: string, zvanje: string, brojTelefona: string): Observable<any> {
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
        brojTelefona
      },
      httpOptions
    );
  }

  registerCompany(username: string, password: string, email: string, naziv: string, godinaOsnivanja: number,
                  lokacija: string, logo: string | null, brojZaposlenih: string, kratkiOpis: string,
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


  logout(): Observable<any> {
    return this.http.post(MojConfig.lokalna_adresa + 'signout', { }, httpOptions);
  }
}

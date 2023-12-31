import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {Pocetna} from "./pocetna/pocetna";

export const routes: Routes = [
  {path: 'pocetna', component: Pocetna},
  {path: 'login', component: LoginComponent}
];

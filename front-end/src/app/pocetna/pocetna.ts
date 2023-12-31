import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-pocetna',
  standalone: true,
    imports: [
        FormsModule,
        RouterLink
    ],
  templateUrl: './pocetna.html',
  styleUrl: './pocetna.component.css'
})
export class Pocetna {

}

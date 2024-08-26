import { Component } from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";
import {CreateCvComponent} from "../create-cv/create-cv.component";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [
    NavbarComponent,
    CreateCvComponent,
    NgIf,
    RouterLink
  ],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.css'
})
export class CvComponent {

  constructor(private router:Router) {

  }


}

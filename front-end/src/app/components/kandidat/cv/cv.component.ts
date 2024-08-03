import { Component } from '@angular/core';
import {NavbarComponent} from "../../navbar/navbar.component";

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.css'
})
export class CvComponent {

}

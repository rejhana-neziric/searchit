import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../layout/navbar/navbar.component";
import {RouterLink} from "@angular/router";
import {NotificationService} from "../../services/notification-service";
import {FooterComponent} from "../layout/footer/footer.component";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    FooterComponent,
    TranslatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  ngOnInit(): void {

  }

}

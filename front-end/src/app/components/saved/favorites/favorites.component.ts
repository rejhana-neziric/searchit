import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../layout/navbar/navbar.component";
import {FormsModule} from "@angular/forms";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {NotificationToastComponent} from "../../notifications/notification-toast/notification-toast.component";
import {RouterLink} from "@angular/router";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {FavoritesOglasiComponent} from "../favorites-oglasi/favorites-oglasi.component";
import {FavoritesKompanijeComponent} from "../favorites-kompanije/favorites-kompanije.component";
import {User} from "../../../modals/user";
import {AuthService} from "../../../services/auth-service";
import {FooterComponent} from "../../layout/footer/footer.component";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    NavbarComponent,
    FormsModule,
    DatePipe,
    NgForOf,
    NgIf,
    NgxPaginationModule,
    NotificationToastComponent,
    RouterLink,
    MatButtonToggle,
    MatButtonToggleGroup,
    FavoritesOglasiComponent,
    FavoritesKompanijeComponent,
    FooterComponent,
    TranslatePipe
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {

  selectedValue: string = 'Jobs';
  kandidat: User = {id: "", role: "", jwt: ""}

  constructor(private authService: AuthService) {
  }

  async ngOnInit(): Promise<void> {
    this.kandidat = this.authService.getLoggedUser();
  }

}



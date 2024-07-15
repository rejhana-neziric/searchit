import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {FormsModule} from "@angular/forms";
import {KompanijePregledComponent} from "../kompanije-pregled/kompanije-pregled.component";
import {PocentaKandidatComponent} from "../kandidat/pocenta-kandidat/pocenta-kandidat.component";
import {NgIf} from "@angular/common";
import {FavoritesComponent} from "../kandidat/favorites/favorites.component";

@Component({
  selector: 'app-oglasi-pregled',
  standalone: true,
  imports: [
    NavbarComponent,
    MatButtonToggleGroup,
    FormsModule,
    MatButtonToggle,
    KompanijePregledComponent,
    PocentaKandidatComponent,
    NgIf,
    FavoritesComponent
  ],
  templateUrl: './oglasi-pregled.component.html',
  styleUrl: './oglasi-pregled.component.css'
})
export class OglasiPregledComponent {
  selectedToggle: string = 'Jobs'; // Default selection

  constructor() { }
}

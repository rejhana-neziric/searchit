import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private router: Router) {
  }

  ngOnInit(): void {
      this.router.navigate(["/pocetna"])
  }
}

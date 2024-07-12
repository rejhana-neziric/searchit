import {booleanAttribute, Component, Input} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgClass
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input({transform: booleanAttribute}) isKandidat!: boolean;

  constructor(private router: Router) { }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
}

import {booleanAttribute, Component, Input} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AsyncPipe, NgClass, NgIf} from "@angular/common";
import {AuthService} from "../../services/auth-service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgClass,
    AsyncPipe
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() user!: string;

  constructor(private router: Router,
              public authService: AuthService) {
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    const targetElement = document.querySelector(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  logout() {
    this.authService.logout();
  }
}

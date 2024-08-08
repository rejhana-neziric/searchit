import {booleanAttribute, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AsyncPipe, NgClass, NgIf} from "@angular/common";
import {AuthService} from "../../services/auth-service";
import {User} from "../../modals/user";
import {firstValueFrom, take} from "rxjs";

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
export class NavbarComponent implements OnInit {
  @Input() user!: string;
  loggedUser: User | null = null;

  constructor(private router: Router,
              public authService: AuthService) {
  }

  async ngOnInit(): Promise<void> {
    try {
      const user = await firstValueFrom(this.authService.user$.pipe(take(1)));
      if (user) {
        this.loggedUser = user;
      }
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    const targetElement = document.querySelector(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({behavior: 'smooth'});
    }
  }

  logout() {
    this.authService.logout();
    this.loggedUser = null;
  }
}

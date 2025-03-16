import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AsyncPipe, NgClass, NgIf } from "@angular/common";
import { AuthService } from "../../../services/auth-service";
import { User } from "../../../modals/user";
import { firstValueFrom, take } from "rxjs";
import {TranslatePipe, TranslateService} from '@ngx-translate/core'; // Dodaj import za TranslateService

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgClass,
    AsyncPipe,
    TranslatePipe
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedUser: User | null = null;

  constructor(
    private router: Router,
    public authService: AuthService,
    private translate: TranslateService // Injektuj TranslateService
  ) {}

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

  navigateAndScrollToSection(sectionId: string) {
    this.router.navigate(['/home']).then(() => {
      this.scrollToSection(sectionId);
    });
  }

  private scrollToSection(sectionId: string) {
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  logout() {
    this.authService.logout();
    this.loggedUser = null;
  }

  // Funkcija za prevođenje, možete koristiti ovo i u HTML-u direktno kroz pipe
  translateKey(key: string) {
    return this.translate.instant(key); // Koristi instant() za prevođenje odmah
  }
}

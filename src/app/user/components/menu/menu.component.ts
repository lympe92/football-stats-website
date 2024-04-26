import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  sideNavOpen: boolean = false;
  constructor(private router: Router) {}

  onIsActive(route: string): boolean {
    return this.router.isActive(route, false);
  }

  onLoginNavigate(): void {
    this.router.navigate(['/sign-in']);
  }

  onHomepageNavigate(): void {
    this.router.navigate(['/']);
  }
}

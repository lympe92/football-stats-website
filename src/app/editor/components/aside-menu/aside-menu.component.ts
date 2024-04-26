import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { AuthService } from 'src/core/auth/auth.service';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent {
  constructor(
    private router: Router,
    private _authService: AuthService,
    private _snackBarService: SnackBarService
  ) {}

  onIsActive(route: string): boolean {
    return this.router.isActive(route, false);
  }

  onLogout(): void {
    this._authService
      .logout()
      .pipe(take(1))
      .subscribe((x: any) =>
        this._snackBarService.openSnackBar('User has logged out')
      );
    this.router.navigate(['/']);
  }
}

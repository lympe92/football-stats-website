import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/core/auth/auth.service';
import { SignUpService } from '../services/sign-up.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  signInForm!: FormGroup;
  destroy$ = new Subject<void>();
  hidePassword: boolean = true;
  constructor(
    private _signUpService: SignUpService,
    private _authService: AuthService,
    private _router: Router,
    private _snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.signInForm = this._signUpService.getSignUpForm();
  }

  onSubmit(): void {
    this._authService
      .logIn(this.signInForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (x: any) => {
          this._router.navigate(['/editor']);
          this._snackBarService.openSnackBar(
            'Signed in with email and password succesfully'
          );
        },
        (error) => {
          this._snackBarService.openSnackBar(error.message);
        }
      );

    this.signInForm.reset();
  }

  navigateToSignUp(): void {
    this._router.navigate(['/sign-up']);
  }

  navigateToHomePage(): void {
    this._router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

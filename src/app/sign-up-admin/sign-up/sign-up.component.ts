import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/core/auth/auth.service';
import { SignUpService } from '../services/sign-up.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  signUpForm!: FormGroup;
  destroy$ = new Subject<void>();
  hidePassword: boolean = true;
  constructor(
    private _signUpService: SignUpService,
    private _authService: AuthService,
    private _router: Router,
    private _snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this._signUpService.getSignUpForm();
  }

  onSubmit(): void {
    this._authService
      .signUp(this.signUpForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (x: any) =>
          this._snackBarService.openSnackBar(
            'Signed up with email and password succesfully!'
          ),
        (error) => this._snackBarService.openSnackBar(error.message)
      );

    this.signUpForm.reset();
  }

  navigateToSignIn(): void {
    this._router.navigate(['/sign-in']);
  }

  navigateToHomePage(): void {
    this._router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

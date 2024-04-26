import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuth } from 'src/app/shared/models/user-auth';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private fb: FormBuilder) {}

  getSignUpForm(user?: UserAuth): FormGroup {
    return this.fb.group({
      email: [user?.email ?? null, [Validators.required, Validators.email]],
      password: [
        user?.password ?? null,
        [Validators.required, Validators.minLength(6)],
      ],
    });
  }
}

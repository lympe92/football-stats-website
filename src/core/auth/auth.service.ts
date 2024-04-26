import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';
import { UserAuth } from 'src/app/shared/models/user-auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _fireauth: AngularFireAuth) {}

  logout(): Observable<void> {
    return from(this._fireauth.signOut());
  }

  signUp(data: UserAuth): Observable<any> {
    return from(
      this._fireauth.createUserWithEmailAndPassword(data.email, data.password)
    )
  }

  logIn(data: UserAuth): Observable<any> {
    return from(
      this._fireauth.signInWithEmailAndPassword(data.email, data.password)  
    ) 
  }
}

import { Injectable } from '@angular/core';import { Auth, User } from '@angular/fire/auth';
;
import { authState } from 'rxfire/auth';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthListenerUserService {

  constructor(
    private _auth: Auth,
  ) { }

  public initAuthListener() {
    authState(this._auth).subscribe( fUser => {
      console.log(fUser);
      console.log(fUser?.uid);
      console.log(fUser?.email);
    });
  }

  public isAuth() {
    return authState(this._auth).pipe(
      map((fUser: any) => fUser !== null)
    )
  }
}

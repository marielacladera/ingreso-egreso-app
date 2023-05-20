import { Injectable } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthLogoutService {

  constructor(
    private _auth: Auth
  ) { }

  public logout(): Promise<void> {
    return signOut((this._auth));
  }
}

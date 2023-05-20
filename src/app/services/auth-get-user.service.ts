import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { User } from '../model/user.model';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGetUserService {

  private _user!: User;

  constructor(
    private _firestore: Firestore,
    private _auth: Auth,
  ) {
  }

  public loadUser(): void {
    authState(this._auth).pipe(take(1)).subscribe((fUser) => {
      if (fUser) {
        const docRef = doc(this._firestore, fUser.uid, 'user');
        getDoc(docRef).then((user: any) => {
          this._user =  User.fromFirebase(user.data());
        });
      }
    });
  }

  /*public getUser(): User {
    return {...this._user};
  }*/

  public get user(): User {
    return {...this._user};
  }
}

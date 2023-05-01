import { Injectable } from '@angular/core';
import { Auth, authState} from '@angular/fire/auth';
import { Firestore, Unsubscribe, doc, onSnapshot } from '@angular/fire/firestore';
import { map } from 'rxjs';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { User } from '../model/user.model';
import * as authActions from '../auth/auth.action';


@Injectable({
  providedIn: 'root',
})
export class AuthListenerUserService {

  userUnsubscribe!: Unsubscribe;

  constructor(
    private _store: Store<AppState>,
    private _firestore: Firestore,
    private _auth: Auth
  ) {}

  public initAuthListener() {
    authState(this._auth).subscribe(fUser => {
      if (fUser) {
        this.userUnsubscribe = onSnapshot(
          doc(this._firestore, fUser.uid,'user'),
          (docUser: any) => {
            console.log(docUser)
            let user = User.fromFirebase(docUser.data());
            this._store.dispatch(authActions.setUser({ user }));
        },
        (err => {
          console.log(err);
        }))
      } else {
        this.userUnsubscribe? this.userUnsubscribe() : null;
        this._store.dispatch(authActions.unSetUser());
      }
    });
  }

  public isAuth() {
    return authState(this._auth)
    .pipe(map((fUser: any) => fUser !== null));
  }
}

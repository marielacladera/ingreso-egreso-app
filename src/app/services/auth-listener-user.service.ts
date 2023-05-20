import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import {
  Firestore,
  Unsubscribe,
  doc,
  onSnapshot,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { User } from '../model/user.model';
import * as authActions from '../auth/auth.action';
import * as incomeDischargeActions from '../income-discharge/income-discharge.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthListenerUserService {

  private  _userUnsubscribe!: Unsubscribe;

  constructor(
    private _store: Store<AppState>,
    private _firestore: Firestore,
    private _auth: Auth
  ) {}

  public initAuthListener(): void {
    authState(this._auth).subscribe((fUser) => {
      if (fUser) {
        this._userUnsubscribe = onSnapshot(
          doc(this._firestore, fUser.uid, 'user'),
          (firestoreUser: any) => {
            const user: User = User.fromFirebase(firestoreUser.data());
            this._store.dispatch(authActions.setUser({ user }));
          },
          (err => {
            console.log(err);
          })
        );
      } else {
        this._userUnsubscribe ? this._userUnsubscribe() : null;
        this._store.dispatch(incomeDischargeActions.unSetItems());
        this._store.dispatch(authActions.unSetUser());
      }
    });
  }

  public isAuth(): Observable<boolean> {
    return authState(this._auth).pipe(map((fUser: any) => fUser !== null));
  }

}

//map permite devolver un objeto diferente

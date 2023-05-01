import { Injectable } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword} from '@angular/fire/auth';
import { User } from '../model/user.model';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthRegisterService {

  constructor(
    private _firestore: Firestore,
    private _auth: Auth,
  ) {}

  public createUser( name: string,
    email: string, password: string ): Promise<void> {
    return createUserWithEmailAndPassword(this._auth, email, password).then(
      ({ user }: UserCredential) => {
        const newUser = new User(user.uid, name, email);
        return setDoc(doc(this._firestore, user.uid, 'user'), { ...newUser });
      }
    );
  }

}

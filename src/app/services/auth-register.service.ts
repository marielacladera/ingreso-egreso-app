import { Injectable } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { User } from '../model/user.model';
import { Firestore, addDoc, doc, setDoc } from'@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthRegisterService {

  constructor(
    private _auth: Auth,
    private _firestore: Firestore
  ) { }

  public createUser(name: string, email: string, password: string): Promise<void> {
    return createUserWithEmailAndPassword(this._auth, email, password)
      .then(({ user }: UserCredential) => {
        const newUser = new User(user.uid, name, email, password);
        return setDoc(doc(this._firestore, user.uid, 'user'), {...newUser});
      });
  }

}

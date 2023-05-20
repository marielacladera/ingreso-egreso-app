import { Injectable } from '@angular/core';
import { AuthGetUserService } from './auth-get-user.service';
import { Firestore, addDoc, collection, doc, updateDoc } from '@angular/fire/firestore';
import { IncomeDischargeFirestore } from '../model/income-discharge-firestore.model';

@Injectable({
  providedIn: 'root'
})
export class IncomeDischargeCreateService {

  constructor(
    private  _authGetUser: AuthGetUserService,
    private _firestore: Firestore,
  ) {
    _authGetUser.loadUser();
  }

  public createIncomeDischarge(incomeDischarge: IncomeDischargeFirestore) {

    const uid = this._authGetUser.user.uid;
    return addDoc(collection(this._firestore, `${uid}/income-discharge/items`), { ...incomeDischarge });


    /*const uid = this._authGetUser.user.uid;
    return addDoc(collection(this._firestore, `${uid}/income-discharge/items`),
    { ...incomeDischarge, uid: null })
    .then((data) => {
      updateDoc(doc(this._firestore, `${uid}/income-discharge/items/${data.id}`), 'uid', data.id);
    });*/

  }

}




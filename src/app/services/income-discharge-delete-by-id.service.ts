import { Injectable } from '@angular/core';
import { Firestore, deleteDoc, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class IncomeDischargeDeleteByIdService {

  constructor(
    private _firebase: Firestore,
  ) { }

  public deleteItem(uidUser: string, uidItem: string): Promise<void> {
    const docRef= doc(this._firebase, `${uidUser}/income-discharge/items/`, uidItem);
    return deleteDoc(docRef);
  }

}

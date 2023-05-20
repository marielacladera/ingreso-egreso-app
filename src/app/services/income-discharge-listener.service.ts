import { Injectable } from '@angular/core';
import { DocumentChangeType, Firestore, Unsubscribe } from '@angular/fire/firestore';
import { CollectionReference, DocumentChange, DocumentData, QueryDocumentSnapshot, collection, onSnapshot } from '@firebase/firestore';
import { AsyncSubject, Observable } from 'rxjs';
import { IncomeDischarge } from '../model/income-discharge.model';
import { IncomeDischargeFirestore } from '../model/income-discharge-firestore.model';

@Injectable({
  providedIn: 'root'
})
export class IncomeDischargeListenerService {

  public _items : IncomeDischarge[];
  unSubscribe!: Unsubscribe;

  constructor(
    private _firestore: Firestore,
  ) {
    this._items = [];
  }

  public initIncomeDischargeListener(uid: string): Observable<IncomeDischarge[]>{
    const collectionRef: CollectionReference<DocumentData> = collection(this._firestore, `${uid}/income-discharge/items`);
      const changesObservable: Observable<IncomeDischarge[]> = new Observable<IncomeDischarge[]>((observer) => {
      const unsubscribe: Unsubscribe = onSnapshot(collectionRef, (snapshop) => {
        snapshop.docChanges().forEach((change: DocumentChange<DocumentData>) => {
          this._handdleAction(change.type, change.doc);
        });
        observer.next(this._items);
      });
      return unsubscribe;
    })
    return changesObservable;
  }

  private _composeUser({ description, type, amount }: IncomeDischargeFirestore, uid: string) {
    return new IncomeDischarge(amount, description, type, uid);
  }

  private _handdleAction(type: DocumentChangeType, document: QueryDocumentSnapshot<DocumentData>): void {
    switch (type) {
      case 'added':
        this._addItem(document);
        break;
      case 'removed':
        this._removeItem(document);
        break;

      default:
        break;
    }
  }

  private _addItem(document: QueryDocumentSnapshot<DocumentData>): void {
    const auxiliar: IncomeDischargeFirestore = IncomeDischargeFirestore.fromFirebase(document.data())
    const auxiliarItem: IncomeDischarge = this._composeUser( auxiliar, document.id)

    this._items = [...this._items, auxiliarItem];
  }

  private _removeItem(document: QueryDocumentSnapshot<DocumentData>): void {
    this._items = this._items.filter(item => item.uid !== document.id);
  }
}

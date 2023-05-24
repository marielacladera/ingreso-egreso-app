import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, take, takeUntil } from 'rxjs';
import { IncomeDischarge } from 'src/app/model/income-discharge.model';
import { IncomeDischargeDeleteByIdService } from 'src/app/services/income-discharge-delete-by-id.service';
import Swal from 'sweetalert2';
import { AppStateWithIncome } from '../income-discharge.reducer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent implements OnInit, OnDestroy {

  public incomeDischarge: IncomeDischarge[];

  private _uidUser!: string;
  private _unSubscribe: Subject<void>;

  constructor(
    private _incomeDischargeDeleteByIdService: IncomeDischargeDeleteByIdService,
    private _store: Store<AppStateWithIncome>,
    private _cdr: ChangeDetectorRef,
  ) {
    this._unSubscribe = new Subject<void>();
    this.incomeDischarge = [];
  }

  public ngOnInit(): void {
    this._initialize();
  }

  public ngOnDestroy(): void {
    this._finalize();
  }


  private _initialize(): void {
    this._store.select('incomeDischarge').pipe(takeUntil(this._unSubscribe)).subscribe(({items}) => {
      this.incomeDischarge = [...items];
      this._cdr.markForCheck();
    });
  }

  public delete(uidItem: string): void {
    this._loadUser();
    this._incomeDischargeDeleteByIdService.deleteItem(this._uidUser, uidItem)
    .then(() => {
      Swal.fire('Delete', 'Item was delete', 'success');
      this._cdr.markForCheck();
    })
    .catch((err) => {
      Swal.fire('Error', err.message, 'error')
    });
  }

  private _finalize(): void{
    this._unSubscribe.next();
    this._unSubscribe.complete();
  }

  private _loadUser(): void {
    this._store.select('auth').pipe(take(1)).subscribe(({user}) => {
      this._uidUser = user!.uid
    });
  }

}

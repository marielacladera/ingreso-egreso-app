import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IncomeDischargeCreateService } from '../services/income-discharge-create.service';
import { IncomeDischarge } from '../model/income-discharge.model';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as ui from '../shared/ui.actions';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IncomeDischargeFirestore } from '../model/income-discharge-firestore.model';

@Component({
  selector: 'app-income-discharge',
  templateUrl: './income-discharge.component.html',
  styleUrls: ['./income-discharge.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomeDischargeComponent implements OnInit, OnDestroy {

  public inputForm: FormGroup;
  public isLoading: boolean;
  public type: string;

  private _unSubscribe: Subject<void>;

  constructor(
    private _incomeDischargeCreateService: IncomeDischargeCreateService,
    private _store: Store<AppState>,
    private _cdr: ChangeDetectorRef,
    private _router: Router,
  ) {
    this._unSubscribe = new Subject<void>();
    this.inputForm = new FormGroup({});
    this.isLoading = false;
    this.type = 'income';
   }

  public ngOnInit(): void {
    this._initialize();
    this._changeLoading();
  }

  public ngOnDestroy(): void {
    this._finalize();
  }

  private _initialize(): void {
    this.inputForm = new FormGroup({
      amount: new FormControl(0, [Validators.required, Validators.min(0)]),
      description: new FormControl('', [Validators.required])
    });
  }

  private _finalize(): void {
    this._unSubscribe.next();
    this._unSubscribe.complete();
  }

  public operate(): void {
    if(this.inputForm.invalid) { return; }
    this._store.dispatch(ui.isLoading());
    const incomeDischarge: IncomeDischargeFirestore = this._composeIncomeDischarge();
    this._incomeDischargeCreateService.createIncomeDischarge({ ...incomeDischarge }).then(() => {
      this._store.dispatch(ui.stopLoading());
      this._router.navigate(['/']);
    }).catch(() => {
      this._store.dispatch(ui.stopLoading());
    });
  }

  private _changeLoading(): void {
    this._store.select('ui')
    .pipe(takeUntil(this._unSubscribe))
      .subscribe(({ isLoading }) => {
        this.isLoading = isLoading;
        this._cdr.markForCheck();
      });
  }

  private _composeIncomeDischarge(): IncomeDischargeFirestore {
    const { amount, description} = this.inputForm.value;
    return  new IncomeDischargeFirestore(amount, description, this.type);
  }

}

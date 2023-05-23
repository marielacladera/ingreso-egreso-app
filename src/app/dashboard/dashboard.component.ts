import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { IncomeDischargeListenerService } from '../services/income-discharge-listener.service';
import * as incomeDischarge from '../income-discharge/income-discharge.actions';
import { IncomeDischarge } from '../model/income-discharge.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {

  private _userSubs: Subject<void>;

  constructor(
    private _incomeDischargeListenerService: IncomeDischargeListenerService,
    private _store: Store<AppState>,
  ) {
    this._userSubs = new Subject<void>();
  }

  public ngOnInit(): void {
    this._initialize();
  }

  public ngOnDestroy(): void {
    this._finalize();
  }

  private _initialize(): void {
    this._store.select('auth').pipe(takeUntil(this._userSubs), mergeMap((user) => {
      if (!user.user) {
        return of([]);
      }

      return this._incomeDischargeListenerService.initIncomeDischargeListener(user.user!.uid);
    })).subscribe((income: IncomeDischarge[]) => {
      this._store.dispatch(
        incomeDischarge.setItems({ items: income })
      );
    });
  }

  private _finalize(): void {
    this._userSubs.next();
    this._userSubs.complete();
  }
}

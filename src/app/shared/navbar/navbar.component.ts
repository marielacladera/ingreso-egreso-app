import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnDestroy {

  public name?: string;

  private _unSuscribe: Subject<void>;

  constructor(
    private _store: Store<AppState>,
    private _cdr: ChangeDetectorRef
  ) {
    this._unSuscribe = new Subject<void>();
  }

  public ngOnInit(): void {
    this._initialize();
  }

  public ngOnDestroy(): void {
    this._finalize();
  }

  private _initialize(): void {
    this._loadName();
  }

  private _finalize(): void {
    this._unSuscribe.next();
    this._unSuscribe.complete();
  }

  private _loadName(): void {
    this._store.select('auth')
    .pipe(takeUntil(this._unSuscribe))
    .subscribe(({user}) => {
      this.name = user?.name;
      this._cdr.markForCheck();
    })
  }
}

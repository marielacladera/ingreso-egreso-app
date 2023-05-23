import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

import { AuthSignInService } from 'src/app/services/auth-sign-in.service';
import * as ui from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent implements OnInit, OnDestroy {

  public isLoading: boolean;
  public loginFormGroup: FormGroup;

  private _unSubscribe: Subject<void>;

  constructor(
    private _authSigInService: AuthSignInService,
    private _store: Store<AppState>,
    private _router: Router,
  ) {
    this.loginFormGroup = new FormGroup({});
    this._unSubscribe = new Subject<void>();
    this.isLoading = false;
  }

  public ngOnInit(): void {
    this._initialize();
  }

  public ngOnDestroy(): void {
    this._finalize();
  }

  private _initialize(): void {
    this._loadLoginForm();
    this._changeLoading();
  }

  private _finalize(): void {
    this._unSubscribe.next();
    this._unSubscribe.complete();
  }

  public login(): void {
    if (this.loginFormGroup.invalid) { return; }
    this._store.dispatch(ui.isLoading());
    const { email, password } = this.loginFormGroup.value;
    this._authSigInService.signIn(email, password)
      .then(() => {
        this._store.dispatch(ui.stopLoading());
        this._router.navigate(['/']);
      })
      .catch(() => {
        this._store.dispatch(ui.stopLoading());
      });
  }

  private _loadLoginForm(): void {
    this.loginFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  private _changeLoading(): void {
    this._store.select('ui')
    .pipe(takeUntil(this._unSubscribe))
      .subscribe(({isLoading}) => {
        this.isLoading = isLoading;
      });
  }

}

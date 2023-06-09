import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthRegisterService } from 'src/app/services/auth-register.service';
import * as ui from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit, OnDestroy {

  public isLoading: boolean;
  public registerFormGroup: FormGroup;

  private _unSubscribe: Subject<void>;


  constructor(
    private _authRegisterService: AuthRegisterService,
    private _store: Store<AppState>,
    private _router: Router
  ) {
    this.registerFormGroup = new FormGroup({});
    this._unSubscribe = new Subject<void>(),
    this.isLoading = false;
  }

  public ngOnInit(): void {
    this._initialize();
  }

  public ngOnDestroy(): void {
    this._finalize();
  }

  private _initialize(): void {
    this._loadRegisterForm();
    this._changeLoading();
  }

  private _finalize(): void {
    this._unSubscribe.next();
    this._unSubscribe.complete();
  }

  public createUser(): void {
    if (this.registerFormGroup.invalid) { return; }
    this._store.dispatch(ui.isLoading());
    const { name, email, password } = this.registerFormGroup.value;
    this._authRegisterService
      .createUser( email, name, password )
      .then(() => {
        this._store.dispatch(ui.stopLoading());
        this._router.navigate(['/']);
      })
      .catch(() => {
        this._store.dispatch(ui.stopLoading());
      });
  }

  private _loadRegisterForm(): void {
    this.registerFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  private _changeLoading(): void {
    this._store.select('ui').pipe(takeUntil(this._unSubscribe))
      .subscribe(({isLoading}) => {
      this.isLoading = isLoading;
    })
  }

}

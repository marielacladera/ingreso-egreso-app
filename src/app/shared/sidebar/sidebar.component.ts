import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, filter, take, takeUntil } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthLogoutService } from 'src/app/services/auth-logout.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit, OnDestroy {

  public name?: string;

  private _unSubscribe: Subject<void>;

  constructor(
    private _logoutService: AuthLogoutService,
    private _cdr: ChangeDetectorRef,
    private _store: Store<AppState>,
    private _router: Router,
  ) {
    this._unSubscribe = new Subject<void>();
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
    this._unSubscribe.next();
    this._unSubscribe.complete();
  }

  private _loadName(): void {
    this._store.select('auth')
    .pipe(takeUntil(this._unSubscribe))
    .subscribe( ({user}) => {
      this.name = user?.name;
      this._cdr.markForCheck();
    });
  }

  public logout(): void{
    Swal.fire({
      title: 'Espere por Favor!',
      didOpen: () => {
        Swal.showLoading()
    }});
    this._logoutService.logout().then(() => {
      Swal.close();
      this._router.navigate(['/login']);
    });
  }

}

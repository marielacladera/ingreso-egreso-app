import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/model/user.model';
import { AuthLogoutService } from 'src/app/services/auth-logout.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {

  public name?: string;

  constructor(
    private _logoutService: AuthLogoutService,
    private _cdr: ChangeDetectorRef,
    private _store: Store<AppState>,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this._initialize();
  }

  private _initialize() {
    this._store.select('auth')
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

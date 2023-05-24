import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthListenerUserService } from './auth-listener-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private _authListenerService: AuthListenerUserService,
    private _router: Router
  ) {}

  public canActivate(): Observable<boolean>{
    return this._authListenerService.isAuth()
    .pipe(
      tap( estado =>{
        if (!estado) {  this._router.navigate(['/login']); }
      })
    );
  }

  public canLoad(): Observable<boolean> {
    return this._authListenerService.isAuth()
    .pipe(
      tap( estado =>{
        if (!estado) {  this._router.navigate(['/login']); }
      }),take(1)
    );
  }

}
//el tap dispara un efecto secundario

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthListenerUserService } from './auth-listener-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authListenerService: AuthListenerUserService,
    private _router: Router
  ) {}

  canActivate(): Observable<boolean>{
    return this._authListenerService.isAuth()
    .pipe(
      tap( estado =>{
        if (!estado) {  this._router.navigate(['/login']); }
      })
    );
  }

}
//el tap dispara un efecto secundario

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public user$? : Observable<any>;

  constructor(
    private _store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this._initialize();
  }

  private _initialize() {
    this.user$ = this._store.select('auth');
  }
}

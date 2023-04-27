import { Component } from '@angular/core';
import { AuthListenerUserService } from './services/auth-listener-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ingreso-egreso-app';

  constructor(private _auth: AuthListenerUserService) {
   _auth.initAuthListener();
  }
}

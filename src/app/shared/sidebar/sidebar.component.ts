import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLogoutService } from 'src/app/services/auth-logout.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private _logoutService: AuthLogoutService,
    private _router: Router
  ) { }

  ngOnInit(): void {
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

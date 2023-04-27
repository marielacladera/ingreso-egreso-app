import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredential } from 'firebase/auth';
import { AuthSignInService } from 'src/app/services/auth-sign-in.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public loginFormGroup: FormGroup;

  constructor(
    private _authSigInService: AuthSignInService,
    private _router: Router
  ) {
    this.loginFormGroup = new FormGroup({});
  }

  public ngOnInit(): void {
    this._initialize();
  }

  public login(): void {
    if (this.loginFormGroup.invalid) { return; }

    Swal.fire({
      title: 'Espere por Favor!',
      didOpen: () => {
        Swal.showLoading()
    }});

    const { email, password } = this.loginFormGroup.value;
    this._authSigInService
      .signIn(email, password)
      .then((res: UserCredential) => {
        console.log('credential signIn: ', res);
        Swal.close();
        this._router.navigate(['/']);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  }

  private _initialize(): void {
    this._loadLoginForm();
  }

  private _loadLoginForm(): void {
    this.loginFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

}

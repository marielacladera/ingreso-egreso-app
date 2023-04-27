import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredential } from 'firebase/auth';
import { AuthRegisterService } from 'src/app/services/auth-register.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {

  public registerFormGroup: FormGroup;

  constructor(private _authRegisterService: AuthRegisterService, private _router: Router) {
    this.registerFormGroup = new FormGroup({});
  }

  public ngOnInit(): void {
    this._initialize();
  }

  public createUser(): void {
    if (this.registerFormGroup.invalid) {
      return;
    }

    Swal.fire({
      title: 'Espere por Favor!',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const { name, email, password } = this.registerFormGroup.value;
    this._authRegisterService
      .createUser(name, email, password)
      .then(() => {
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
    this._loadForm();
  }

  private _loadForm(): void {
    this.registerFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

}

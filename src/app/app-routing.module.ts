import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { IncomeDischargeModule } from './income-discharge/income-discharge.module';
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '',
  canLoad: [ AuthGuard ],
    loadChildren:() => import('./income-discharge/income-discharge.module').then(m => m.IncomeDischargeModule)
  },
  { path: '**', redirectTo: ''}
];

@NgModule({

  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}

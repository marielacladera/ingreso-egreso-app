import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { IncomeDischargeComponent } from './income-discharge.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { OrderIncomeDischargePipe } from '../pipes/order-income-discharge.pipe';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { incomeDischargeReducer } from './income-discharge.reducer';

@NgModule({
  declarations: [
    IncomeDischargeComponent,
    DashboardComponent,
    DetailComponent,
    OrderIncomeDischargePipe,
    StatisticsComponent,
 ],
  imports: [
    CommonModule,
    DashboardRoutesModule,
    NgChartsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    StoreModule.forFeature('incomeDischarge', incomeDischargeReducer)
  ],
  exports: []
})
export class IncomeDischargeModule { }

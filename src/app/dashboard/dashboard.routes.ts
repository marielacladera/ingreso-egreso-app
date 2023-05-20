import { Routes } from "@angular/router";
import { StatisticsComponent } from "../income-discharge/statistics/statistics.component";
import { IncomeDischargeComponent } from "../income-discharge/income-discharge.component";
import { DetailComponent } from "../income-discharge/detail/detail.component";
//import { StatisticsComponent } from "../input-output/statistics/statistics.component";
//import { InputOutputComponent } from "../input-output/input-output.component";
//import { DetailComponent } from "../input-output/detail/detail.component";

export const dashboardRoutes: Routes = [
  { path: '', component: StatisticsComponent },
  { path: 'ingreso-egreso', component: IncomeDischargeComponent },
  { path: 'detalle', component: DetailComponent }
];



import { ActionReducerMap } from "@ngrx/store";
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer'
import * as incomeDischarge from "./income-discharge/income-discharge.reducer";

export interface AppState{
  ui: ui.State,
  auth: auth.State,
  //incomeDischarge: incomeDischarge.State
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer,
  //incomeDischarge: incomeDischarge.incomeDischargeReducer,
}

import { createReducer, on } from '@ngrx/store';
import { IncomeDischarge } from '../model/income-discharge.model';
import { setItems, unSetItems } from './income-discharge.actions';
import { AppState } from '../app.reducer';

export interface State {
  items: IncomeDischarge[];
}

export const initialState: State = {
  items: [],
}

export interface AppStateWithIncome extends AppState {
  incomeDischarge: State,
}

export const incomeDischargeReducer = createReducer(
  initialState,
  on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(unSetItems, state => ({ ...state, items: [] })),
)

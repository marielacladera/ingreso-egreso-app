import { createReducer, on } from '@ngrx/store';
import { IncomeDischarge } from '../model/income-discharge.model';
import { setItems, unSetItems } from './income-discharge.actions';

export interface State {
  items: IncomeDischarge[];
}

export const initialState: State = {
  items: [],
}

export const incomeDischargeReducer = createReducer(
  initialState,
  on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(unSetItems, state => ({ ...state, items: [] })),
)

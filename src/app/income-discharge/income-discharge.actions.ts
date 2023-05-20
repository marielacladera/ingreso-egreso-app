import { createAction, props } from '@ngrx/store';
import { IncomeDischarge } from '../model/income-discharge.model';

export const setItems = createAction (
  '[IncomeDischarge] Set Items',
  props<{ items: IncomeDischarge[] }> ()
);

export const unSetItems = createAction (
  '[IncomeDischarge] Unset Items',
);

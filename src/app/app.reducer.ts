import { ActionReducerMap } from '@ngrx/store';
 import * as uiReducer from './shared/ui.reducer';
 import * as authReducer from './auth/auth.reducer';
 import * as ingresosEgresosReducer from './pages/dashboard/ingreso-egreso/ingreso-egresos.reducer'

export interface AppState {
  ui: uiReducer.State,
  auth: authReducer.State,
  ingresosEgresos: ingresosEgresosReducer.State
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer.uiReducer,
  auth: authReducer.authReducer,
  ingresosEgresos: ingresosEgresosReducer.ingresosEgresosReducer
};


import { createReducer, on } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { IngresoEgreso } from '../../../shared/models/ingreso-egreso.model';
import { setItems, unSetItems } from "./ingreso-egreso.actions";

export interface State {
  items: IngresoEgreso[]
};

export interface AppStateWithIngresoEgreso extends AppState {
  ingresosEgresos: State
}

export const initialState: State = {
  items: []
};

const _ingresosEgresosReducer = createReducer(
  initialState,
  on(setItems, (state, {items}) => ({...state, items: [...items ]})),
  on(unSetItems, (state) => ({...state, items: [] })),
);

export function ingresosEgresosReducer(state: any, action: any ) {
  return _ingresosEgresosReducer(state, action);
};

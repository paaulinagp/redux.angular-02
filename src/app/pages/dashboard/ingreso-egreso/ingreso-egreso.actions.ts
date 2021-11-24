import { createAction, props } from "@ngrx/store";
import { IngresoEgreso } from '../../../shared/models/ingreso-egreso.model';

export const unSetItems = createAction('[IngresoEgreso] Un Set Items');

export const setItems = createAction(
  '[IngresoEgreso] Un Set Items',
  props<{items: IngresoEgreso[]}>()
);
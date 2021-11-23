import { ActionReducerMap } from '@ngrx/store';
 import * as uiReducers from './shared/ui.reducer';

export interface AppState {
  ui: uiReducers.State
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducers.uiReducer
};


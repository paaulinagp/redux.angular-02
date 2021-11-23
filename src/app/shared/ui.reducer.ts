import { createReducer, on } from '@ngrx/store';
import { showLoading, hideLoading } from './ui.actions';


export interface State {
  isLoading: boolean;
}

export const initialState: State = {
  isLoading: false
};

const _uiReducer = createReducer(
  initialState,
  on(showLoading, (state) => ({...state, isLoading: true  })),
  on(hideLoading, (state) => ({...state, isLoading: false })),
);

export function uiReducer(state: any, action: any) {
  return _uiReducer(state, action);
}
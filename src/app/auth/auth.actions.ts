import { createAction, props } from "@ngrx/store";
import { User } from "../shared/models/user.model";

export const setUser = createAction(
  '[Auth] setUser',
  props<{user: User | null }>()
);

export const unSetUser = createAction('[Auth] unSetUser');
import {createActionGroup, props} from '@ngrx/store';
import {AuthResponseInterface} from "../models/auth-response.interface";

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Login': props<{ username: string, password: string }>(),
    'Login Success': props<{ data: AuthResponseInterface }>(),
    'Login Failure': props<{ error: string }>(),
  }
});

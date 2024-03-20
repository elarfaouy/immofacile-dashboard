import {createActionGroup, props} from '@ngrx/store';
import {AuthResponseInterface} from "../models/auth-response.interface";
import {UserInterface} from "../models/user.interface";

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Login': props<{ username: string, password: string }>(),
    'Login Success': props<{ data: AuthResponseInterface }>(),
    'Login Failure': props<{ error: string }>(),
    'Load Users': props<{ onlyWantToBeAgent: boolean }>(),
    'Load Users Success': props<{ data: UserInterface[] }>(),
    'Load Users Failure': props<{ error: string }>(),
    'Suspend User': props<{ username: string }>(),
    'Suspend User Success': props<{ data: UserInterface }>(),
    'Suspend User Failure': props<{ error: string }>(),
    'Unsuspend User': props<{ username: string }>(),
    'Unsuspend User Success': props<{ data: UserInterface }>(),
    'Unsuspend User Failure': props<{ error: string }>(),
    'Delete User': props<{ username: string }>(),
    'Delete User Success': props<{ username: string }>(),
    'Delete User Failure': props<{ error: string }>(),
    'Accept User As Agent': props<{ username: string }>(),
    'Accept User As Agent Success': props<{ data: UserInterface }>(),
    'Accept User As Agent Failure': props<{ error: string }>(),
  }
});

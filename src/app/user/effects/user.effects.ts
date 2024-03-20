import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {UserActions} from '../actions/user.actions';
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {UserService} from "../../service/user/user.service";


@Injectable()
export class UserEffects {

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.login),
      concatMap((action) =>
        this.authService.login(action.username, action.password).pipe(
          map(data => UserActions.loginSuccess({data})),
          catchError(error => of(UserActions.loginFailure({error: error.error.message})))
        )
      )
    );
  });

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      concatMap((action) =>
        this.userService.getUsers(action.onlyWantToBeAgent).pipe(
          map(data => UserActions.loadUsersSuccess({data})),
          catchError(error => of(UserActions.loadUsersFailure({error: error.error.message})))
        )
      )
    );
  });

  suspendUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.suspendUser),
      concatMap((action) =>
        this.userService.suspendUser(action.username).pipe(
          map(data => UserActions.suspendUserSuccess({data})),
          catchError(error => of(UserActions.suspendUserFailure({error: error.error.message})))
        )
      )
    );
  });

  unsuspendUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.unsuspendUser),
      concatMap((action) =>
        this.userService.unsuspendUser(action.username).pipe(
          map(data => UserActions.unsuspendUserSuccess({data})),
          catchError(error => of(UserActions.unsuspendUserFailure({error: error.error.message})))
        )
      )
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.deleteUser),
      concatMap((action) =>
        this.userService.deleteUser(action.username).pipe(
          map(() => UserActions.deleteUserSuccess({username: action.username})),
          catchError(error => of(UserActions.deleteUserFailure({error: error.error.message})))
        )
      )
    );
  });

  acceptUserAsAgent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.acceptUserAsAgent),
      concatMap((action) =>
        this.userService.acceptUserAsAgent(action.username).pipe(
          map(data => UserActions.acceptUserAsAgentSuccess({data})),
          catchError(error => of(UserActions.acceptUserAsAgentFailure({error: error.error.message})))
        )
      )
    );
  });


  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private userService: UserService
  ) {
  }
}

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {UserActions} from '../actions/user.actions';
import {AuthenticationService} from "../../service/authentication/authentication.service";


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


  constructor(
    private actions$: Actions,
    private authService: AuthenticationService
  ) {
  }
}

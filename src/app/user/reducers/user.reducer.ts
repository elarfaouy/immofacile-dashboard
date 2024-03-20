import {createFeature, createReducer, on} from '@ngrx/store';
import {UserActions} from '../actions/user.actions';

export const userFeatureKey = 'user';

export interface State {
  keys: {
    accessToken: string;
    tokenExpiration: string;
    refreshToken: string;
  };
  error: string;
}

export const initialState: State = {
  keys: {
    accessToken: "",
    tokenExpiration: "",
    refreshToken: "",
  },
  error: "",
};

export const reducer = createReducer(
  initialState,
  on(UserActions.login, (state, {username, password}) => ({...state})),
  on(UserActions.loginSuccess, (state, {data}) => ({
    ...state,
    keys: {
      accessToken: data["access-token"],
      tokenExpiration: data["token-expiration"],
      refreshToken: data["refresh-token"]
    }
  })),
  on(UserActions.loginFailure, (state, {error}) => ({
    ...state,
    error: error
  })),
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});


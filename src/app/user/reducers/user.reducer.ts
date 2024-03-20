import {createFeature, createReducer, on} from '@ngrx/store';
import {UserActions} from '../actions/user.actions';
import {UserInterface} from "../models/user.interface";

export const userFeatureKey = 'user';

export interface State {
  keys: {
    accessToken: string;
    tokenExpiration: string;
    refreshToken: string;
  };
  users: UserInterface[];
  error: string;
}

export const initialState: State = {
  keys: {
    accessToken: "",
    tokenExpiration: "",
    refreshToken: "",
  },
  users: [],
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
  on(UserActions.loadUsers, (state, {onlyWantToBeAgent}) => ({...state})),
  on(UserActions.loadUsersSuccess, (state, {data}) => ({
    ...state,
    users: data
  })),
  on(UserActions.loadUsersFailure, (state, {error}) => ({
    ...state,
    error: error
  })),
  on(UserActions.suspendUser, (state, {username}) => ({...state})),
  on(UserActions.suspendUserSuccess, (state, {data}) => ({
    ...state,
    users: state.users.map(user => user.username === data.username ? data : user)
  })),
  on(UserActions.suspendUserFailure, (state, {error}) => ({
    ...state,
    error: error
  })),
  on(UserActions.unsuspendUser, (state, {username}) => ({...state})),
  on(UserActions.unsuspendUserSuccess, (state, {data}) => ({
    ...state,
    users: state.users.map(user => user.username === data.username ? data : user)
  })),
  on(UserActions.unsuspendUserFailure, (state, {error}) => ({
    ...state,
    error: error
  })),
  on(UserActions.deleteUser, (state, {username}) => ({...state})),
  on(UserActions.deleteUserSuccess, (state, {username}) => ({
    ...state,
    users: state.users.filter(user => user.username !== username)
  })),
  on(UserActions.deleteUserFailure, (state, {error}) => ({
    ...state,
    error: error
  })),
  on(UserActions.acceptUserAsAgent, (state, {username}) => ({...state})),
  on(UserActions.acceptUserAsAgentSuccess, (state, {data}) => ({
    ...state,
    users: state.users.filter(user => user.username !== data.username)
  })),
  on(UserActions.acceptUserAsAgentFailure, (state, {error}) => ({
    ...state,
    error: error
  })),
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});


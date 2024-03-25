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
  error: string | null
}

export const initialState: State = {
  keys: {
    accessToken: "",
    tokenExpiration: "",
    refreshToken: "",
  },
  users: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(UserActions.login, (state, {username, password}) => ({
    ...state,
    error: null
  })),
  on(UserActions.loginSuccess, (state, {data}) => ({
    ...state,
    error: null,
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
  on(UserActions.loadUsers, (state, {onlyWantToBeAgent}) => ({
    ...state,
    error: null
  })),
  on(UserActions.loadUsersSuccess, (state, {data}) => ({
    ...state,
    users: data,
    error: null
  })),
  on(UserActions.loadUsersFailure, (state, {error}) => ({
    ...state,
    error: error
  })),
  on(UserActions.suspendUser, (state, {username}) => ({
    ...state,
    error: null
  })),
  on(UserActions.suspendUserSuccess, (state, {data}) => ({
    ...state,
    error: null,
    users: state.users.map(user => user.username === data.username ? data : user)
  })),
  on(UserActions.suspendUserFailure, (state, {error}) => ({
    ...state,
    error: error
  })),
  on(UserActions.unsuspendUser, (state, {username}) => ({
    ...state,
    error: null
  })),
  on(UserActions.unsuspendUserSuccess, (state, {data}) => ({
    ...state,
    error: null,
    users: state.users.map(user => user.username === data.username ? data : user)
  })),
  on(UserActions.unsuspendUserFailure, (state, {error}) => ({
    ...state,
    error: error
  })),
  on(UserActions.deleteUser, (state, {username}) => ({
    ...state,
    error: null
  })),
  on(UserActions.deleteUserSuccess, (state, {username}) => ({
    ...state,
    error: null,
    users: state.users.filter(user => user.username !== username)
  })),
  on(UserActions.deleteUserFailure, (state, {error}) => ({
    ...state,
    error: error
  })),
  on(UserActions.acceptUserAsAgent, (state, {username}) => ({
    ...state,
    error: null,
  })),
  on(UserActions.acceptUserAsAgentSuccess, (state, {data}) => ({
    ...state,
    error: null,
    users: state.users.filter(user => user.username !== data.username)
  })),
  on(UserActions.acceptUserAsAgentFailure, (state, {error}) => ({
    ...state,
    error: error
  })),
  on(UserActions.loadProfile, state => ({
    ...state,
    error: null
  })),
  on(UserActions.loadProfileSuccess, (state, action) => ({
    ...state,
    error: null,
    profile: action.data
  })),
  on(UserActions.loadProfileFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});


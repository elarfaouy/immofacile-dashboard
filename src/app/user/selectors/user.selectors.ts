import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromUser from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey
);

export const selectUserKeys = createSelector(
  selectUserState,
  (state) => state.keys
);

export const selectUserError = createSelector(
  selectUserState,
  (state) => state.error
);

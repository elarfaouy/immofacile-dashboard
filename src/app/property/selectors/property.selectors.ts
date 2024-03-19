import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromProperty from '../reducers/property.reducer';

export const selectPropertyState = createFeatureSelector<fromProperty.State>(
  fromProperty.propertyFeatureKey
);

export const selectPropertyError = createSelector(
  selectPropertyState,
  state => state.error
);

export const selectPropertyPageable = createSelector(
  selectPropertyState,
  state => state.pageableProperties
);

export const selectPropertiesList = createSelector(
  selectPropertyState,
  state => state.pageableProperties?.content
);

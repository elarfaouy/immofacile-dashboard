import {createFeature, createReducer, on} from '@ngrx/store';
import {PropertyActions} from '../actions/property.actions';
import {PageablePropertiesInterface} from "../models/PageableProperties.interface";

export const propertyFeatureKey = 'property';

export interface State {
  error: string | null;
  pageableProperties: PageablePropertiesInterface | null;
}

export const initialState: State = {
  error: null,
  pageableProperties: null
};

export const reducer = createReducer(
  initialState,
  on(PropertyActions.loadPropertys, state => state),
  on(PropertyActions.loadPropertysSuccess, (state, action) => ({
    ...state,
    pageableProperties: action.data
  })),
  on(PropertyActions.loadPropertysFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
);

export const propertyFeature = createFeature({
  name: propertyFeatureKey,
  reducer,
});


import {createFeature, createReducer, on} from '@ngrx/store';
import {PropertyActions} from '../actions/property.actions';
import {PageablePropertiesInterface} from "../models/PageableProperties.interface";

export const propertyFeatureKey = 'property';

export interface State {
  error: string | null;
  pageableProperties: PageablePropertiesInterface;
}

export const initialState: State = {
  error: null,
  pageableProperties: {
    content: [],
    totalElements: 0,
    totalPages: 0,
    last: false,
    size: 0,
    empty: false,
    number: 0,
    first: false,
    numberOfElements: 0
  }
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
  on(PropertyActions.deleteProperty, state => state),
  on(PropertyActions.deletePropertySuccess, (state, action) => ({
    ...state,
    pageableProperties: {
      ...state.pageableProperties,
      content: state.pageableProperties.content.filter(property => property.id !== action.id) || []
    }
  })),
  on(PropertyActions.deletePropertyFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(PropertyActions.updatePropertyStatus, state => state),
  on(PropertyActions.updatePropertyStatusSuccess, (state, action) => ({
    ...state,
    pageableProperties: {
      ...state.pageableProperties,
      content: state.pageableProperties.content.map(property => {
        if (property.id === action.property.id) {
          return action.property;
        }
        return property;
      })
    }
  })),
  on(PropertyActions.updatePropertyStatusFailure, (state, action) => ({
    ...state,
    error: action.error
  }))
);

export const propertyFeature = createFeature({
  name: propertyFeatureKey,
  reducer,
});


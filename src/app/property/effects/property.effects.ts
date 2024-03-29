import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {PropertyActions} from '../actions/property.actions';
import {PropertyService} from "../../service/property/property.service";


@Injectable()
export class PropertyEffects {

  loadPropertys$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PropertyActions.loadPropertys),
      concatMap((action) =>
        this.propertyService.getProperties(action.page, action.size, action.status).pipe(
          map(data => PropertyActions.loadPropertysSuccess({data: data})),
          catchError(error => of(PropertyActions.loadPropertysFailure({error: error.message}))))
      )
    );
  });

  deleteProperty$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PropertyActions.deleteProperty),
      concatMap((action) =>
        this.propertyService.deleteProperty(action.id).pipe(
          map(() => PropertyActions.deletePropertySuccess({id: action.id})),
          catchError(error => of(PropertyActions.deletePropertyFailure({error: error.message}))))
      )
    );
  });

  updatePropertyStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PropertyActions.updatePropertyStatus),
      concatMap((action) =>
        this.propertyService.updatePropertyStatus(action.id, action.status).pipe(
          map(property => PropertyActions.updatePropertyStatusSuccess({property: property})),
          catchError(error => of(PropertyActions.updatePropertyStatusFailure({error: error.message}))))
      )
    );
  });


  constructor(
    private actions$: Actions,
    private propertyService: PropertyService
  ) {
  }
}

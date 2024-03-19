import {createActionGroup, props} from '@ngrx/store';
import {PageablePropertiesInterface} from "../models/PageableProperties.interface";

export const PropertyActions = createActionGroup({
  source: 'Property',
  events: {
    'Load Propertys': props<{ page: number, size: number, status: string }>(),
    'Load Propertys Success': props<{ data: PageablePropertiesInterface }>(),
    'Load Propertys Failure': props<{ error: string }>(),
  }
});

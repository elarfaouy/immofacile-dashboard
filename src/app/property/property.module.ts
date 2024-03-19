import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PropertyRoutingModule} from './property-routing.module';
import {StoreModule} from '@ngrx/store';
import * as fromProperty from './reducers/property.reducer';
import {EffectsModule} from '@ngrx/effects';
import {PropertyEffects} from './effects/property.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PropertyRoutingModule,
    StoreModule.forFeature(fromProperty.propertyFeatureKey, fromProperty.reducer),
    EffectsModule.forFeature([PropertyEffects]),
  ]
})
export class PropertyModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {propertyFeature} from './reducers/property.reducer';
import {EffectsModule} from '@ngrx/effects';
import {PropertyEffects} from './effects/property.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(propertyFeature),
    EffectsModule.forFeature([PropertyEffects]),
  ]
})
export class PropertyModule {
}

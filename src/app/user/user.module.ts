import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './effects/user.effects';
import {StoreModule} from "@ngrx/store";
import {userFeature} from "./reducers/user.reducer";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(userFeature),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class UserModule {
}

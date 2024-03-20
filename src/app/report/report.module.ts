import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ReportEffects } from './effects/report.effects';
import {StoreModule} from "@ngrx/store";
import {reportFeature} from "./reducers/report.reducer";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(reportFeature),
    EffectsModule.forFeature([ReportEffects])
  ]
})
export class ReportModule { }

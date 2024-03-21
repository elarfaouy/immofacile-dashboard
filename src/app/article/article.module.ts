import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {ArticleEffects} from './effects/article.effects';
import {StoreModule} from "@ngrx/store";
import {articleFeature} from "./reducers/article.reducer";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(articleFeature),
    EffectsModule.forFeature([ArticleEffects])
  ]
})
export class ArticleModule {
}

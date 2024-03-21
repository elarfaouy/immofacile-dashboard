import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromArticle from '../reducers/article.reducer';

export const selectArticleState = createFeatureSelector<fromArticle.State>(
  fromArticle.articleFeatureKey
);

export const selectPageableArticles = createSelector(
  selectArticleState,
  (state) => state.pageableArticles
);

export const selectArticleError = createSelector(
  selectArticleState,
  (state) => state.error
);

export const selectArticleByTitle = (title: string) => createSelector(
  selectPageableArticles,
  (state) => state.content.find(article => article.title === title)
);

export const selectArticleCategories = createSelector(
  selectArticleState,
  (state) => state.categories
);

export const selectArticleTags = createSelector(
  selectArticleState,
  (state) => state.tags
);

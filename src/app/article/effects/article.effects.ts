import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, concatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {ArticleActions} from '../actions/article.actions';
import {ArticleService} from "../../service/article/article.service";


@Injectable()
export class ArticleEffects {

  loadArticles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArticleActions.loadArticles),
      concatMap((action) =>
        this.articleService.getArticles(action.page, action.size, action.status).pipe(
          map(data => ArticleActions.loadArticlesSuccess({data})),
          catchError(error => of(ArticleActions.loadArticlesFailure({error}))))
      )
    );
  });

  storeArticle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArticleActions.storeArticle),
      concatMap((action: { title: string; content: string; category: number; tags: number[] }) =>
        this.articleService.storeArticle(action.title, action.content, action.category, action.tags).pipe(
          map(data => ArticleActions.storeArticleSuccess({data})),
          catchError(error => of(ArticleActions.storeArticleFailure({error: error.error.message}))))
      )
    );
  });

  storeArticleImage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArticleActions.storeArticleImage),
      concatMap((action) =>
        this.articleService.storeArticleImage(action.slug, action.cover).pipe(
          map(data => ArticleActions.storeArticleImageSuccess({data})),
          catchError(error => of(ArticleActions.storeArticleImageFailure({error: error.error.message}))))
      )
    );
  });

  updateArticleStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArticleActions.updateArticleStatus),
      concatMap((action) =>
        this.articleService.updateArticleStatus(action.slug, action.status).pipe(
          map(data => ArticleActions.updateArticleStatusSuccess({data})),
          catchError(error => of(ArticleActions.updateArticleStatusFailure({error: error.error.message}))))
      )
    );
  });

  deleteArticle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArticleActions.deleteArticle),
      concatMap((action) =>
        this.articleService.deleteArticle(action.slug).pipe(
          map(() => ArticleActions.deleteArticleSuccess({slug: action.slug})),
          catchError(error => of(ArticleActions.deleteArticleFailure({error: error.error.message}))))
      )
    );
  });

  loadCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArticleActions.loadCategories),
      concatMap(() =>
        this.articleService.getCategories().pipe(
          map(data => ArticleActions.loadCategoriesSuccess({data})),
          catchError(error => of(ArticleActions.loadCategoriesFailure({error: error.error.message}))))
      )
    );
  });

  loadTags$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ArticleActions.loadTags),
      concatMap(() =>
        this.articleService.getTags().pipe(
          map(data => ArticleActions.loadTagsSuccess({data})),
          catchError(error => of(ArticleActions.loadTagsFailure({error: error.error.message}))))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private articleService: ArticleService
  ) {
  }
}

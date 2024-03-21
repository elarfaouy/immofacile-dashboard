import {createFeature, createReducer, on} from '@ngrx/store';
import {ArticleActions} from '../actions/article.actions';
import {PageableArticlesInterface} from "../models/pageable-articles.interface";
import {CategoryInterface} from "../models/category.interface";
import {TagInterface} from "../models/tag.interface";

export const articleFeatureKey = 'article';

export interface State {
  pageableArticles: PageableArticlesInterface;
  error: string | null;
  categories: CategoryInterface[];
  tags: TagInterface[];
}

export const initialState: State = {
  pageableArticles: {
    content: [],
    totalElements: 0,
    totalPages: 0,
    last: false,
    size: 0,
    number: 0,
    numberOfElements: 0,
    first: false,
    empty: false,
  },
  error: null,
  categories: [],
  tags: []
};

export const reducer = createReducer(
  initialState,
  on(ArticleActions.loadArticles, state => state),
  on(ArticleActions.loadArticlesSuccess, (state, action) => ({
    ...state,
    pageableArticles: action.data
  })),
  on(ArticleActions.loadArticlesFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(ArticleActions.storeArticle, state => state),
  on(ArticleActions.storeArticleSuccess, (state, action) => ({
    ...state,
    pageableArticles: {
      ...state.pageableArticles,
      content: [...state.pageableArticles.content, action.data]
    }
  })),
  on(ArticleActions.storeArticleFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(ArticleActions.storeArticleImage, state => state),
  on(ArticleActions.storeArticleImageSuccess, (state, action) => state),
  on(ArticleActions.storeArticleImageFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(ArticleActions.updateArticleStatus, state => state),
  on(ArticleActions.updateArticleStatusSuccess, (state, action) => ({
    ...state,
    pageableArticles: {
      ...state.pageableArticles,
      content: state.pageableArticles.content.map(article => {
        if (article.slug === action.data.slug) {
          return action.data;
        }
        return article;
      })
    }
  })),
  on(ArticleActions.updateArticleStatusFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(ArticleActions.deleteArticle, state => state),
  on(ArticleActions.deleteArticleSuccess, (state, action) => ({
    ...state,
    pageableArticles: {
      ...state.pageableArticles,
      content: state.pageableArticles.content.filter(article => article.slug !== action.slug)
    }
  })),
  on(ArticleActions.deleteArticleFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(ArticleActions.loadCategories, state => state),
  on(ArticleActions.loadCategoriesSuccess, (state, action) => ({
    ...state,
    categories: action.data
  })),
  on(ArticleActions.loadCategoriesFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(ArticleActions.loadTags, state => state),
  on(ArticleActions.loadTagsSuccess, (state, action) => ({
    ...state,
    tags: action.data
  })),
  on(ArticleActions.loadTagsFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
);

export const articleFeature = createFeature({
  name: articleFeatureKey,
  reducer,
});


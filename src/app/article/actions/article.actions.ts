import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {PageableArticlesInterface} from "../models/pageable-articles.interface";
import {ArticleInterface} from "../models/article.interface";
import {CategoryInterface} from "../models/category.interface";
import {TagInterface} from "../models/tag.interface";

export const ArticleActions = createActionGroup({
  source: 'Article',
  events: {
    'Load Articles': props<{ page: number, size: number, status: string }>(),
    'Load Articles Success': props<{ data: PageableArticlesInterface }>(),
    'Load Articles Failure': props<{ error: string }>(),
    'Store Article': props<{ title: string, content: string, category: number, tags: number[] }>(),
    'Store Article Success': props<{ data: ArticleInterface }>(),
    'Store Article Failure': props<{ error: string }>(),
    'Store Article Image': props<{ slug: string, cover: FormData }>(),
    'Store Article Image Success': props<{ data: ArticleInterface }>(),
    'Store Article Image Failure': props<{ error: string }>(),
    'Update Article Status': props<{ slug: string, status: string }>(),
    'Update Article Status Success': props<{ data: ArticleInterface }>(),
    'Update Article Status Failure': props<{ error: string }>(),
    'Delete Article': props<{ slug: string }>(),
    'Delete Article Success': props<{ slug: string }>(),
    'Delete Article Failure': props<{ error: string }>(),
    'Load Categories': emptyProps(),
    'Load Categories Success': props<{ data: CategoryInterface[] }>(),
    'Load Categories Failure': props<{ error: string }>(),
    'Load Tags': emptyProps(),
    'Load Tags Success': props<{ data: TagInterface[] }>(),
    'Load Tags Failure': props<{ error: string }>(),
  }
});

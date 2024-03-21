import {ArticleInterface} from "./article.interface";

export interface PageableArticlesInterface {
  content: Array<ArticleInterface>;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
  first: boolean;
  last: boolean;
}

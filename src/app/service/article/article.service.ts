import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageableArticlesInterface} from "../../article/models/pageable-articles.interface";
import {map} from "rxjs/operators";
import {ArticleInterface} from "../../article/models/article.interface";
import {CategoryInterface} from "../../article/models/category.interface";
import {TagInterface} from "../../article/models/tag.interface";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  url = 'http://localhost:8080/api/article';

  constructor(private http: HttpClient) {
  }

  getArticles(page: number, size: number, status: string): Observable<PageableArticlesInterface> {
    let observable = this.http.get<any>(this.url, {
      params: {
        page: page,
        size: size,
        status: status
      }
    });

    return observable.pipe(
      map(standardInterface => standardInterface.data)
    );
  }

  storeArticle(title: string, content: string, category: number, tags: number[]): Observable<ArticleInterface> {
    let observable = this.http.post<any>(this.url, {title, content, category, tags});

    return observable.pipe(
      map(standardInterface => standardInterface.data)
    );
  }

  storeArticleImage(slug: string, cover: FormData): Observable<ArticleInterface> {
    let observable = this.http.post<any>(`${this.url}/images/${slug}`, cover);

    return observable.pipe(
      map(standardInterface => standardInterface.data)
    );
  }

  updateArticleStatus(slug: string, status: string): Observable<ArticleInterface> {
    let observable = this.http.put<any>(`${this.url}/status/${slug}`, {status: status});

    return observable.pipe(
      map(standardInterface => standardInterface.data)
    );
  }

  deleteArticle(slug: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${slug}`);
  }

  getCategories(): Observable<CategoryInterface[]> {
    let observable = this.http.get<any>(`${this.url}/categories`);

    return observable.pipe(
      map(standardInterface => standardInterface.data)
    );
  }

  getTags(): Observable<TagInterface[]> {
    let observable = this.http.get<any>(`${this.url}/tags`);

    return observable.pipe(
      map(standardInterface => standardInterface.data)
    );
  }
}

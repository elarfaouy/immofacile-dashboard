import {Component, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatDialog} from "@angular/material/dialog";
import {ArticleAddDialogComponent} from "../../component/article-add-dialog/article-add-dialog.component";
import {ArticleInterface} from "../../article/models/article.interface";
import {PageableArticlesInterface} from "../../article/models/pageable-articles.interface";
import {select, Store} from "@ngrx/store";
import {selectArticleError, selectPageableArticles} from "../../article/selectors/article.selectors";
import {ArticleActions} from "../../article/actions/article.actions";
import {PageEvent} from "@angular/material/paginator";
import {
  ArticleUpdateStatusDialogComponent
} from "../../component/article-update-status-dialog/article-update-status-dialog.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrl: './articles-page.component.css'
})
export class ArticlesPageComponent {
  pageEvent: {
    pageIndex: number;
    pageSize: number;
    length: number;
  } = {pageIndex: 0, pageSize: 5, length: 0};
  articles: ArticleInterface[] = [];
  pageableArticles: Observable<PageableArticlesInterface> = this.store.pipe(select(selectPageableArticles));
  statusFilter: string = "";
  displayedColumns: string[] = ["title", "author", "category", "views", "status", "actions"];
  dataSource = new MatTableDataSource<any>([]);
  error$ = this.store.select(selectArticleError);
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public store: Store,
    private dialog: MatDialog,
    private toast: ToastrService,
    private _liveAnnouncer: LiveAnnouncer,) {
  }

  ngOnInit(): void {
    this.store.dispatch(ArticleActions.loadArticles({
      page: this.pageEvent.pageIndex,
      size: this.pageEvent.pageSize,
      status: this.statusFilter
    }));

    this.pageableArticles.subscribe(
      data => {
        if (data) {
          this.pageEvent.length = data.totalElements;
          this.dataSource = new MatTableDataSource<any>(data.content);
          this.dataSource.sort = this.sort;
        } else {
          this.dataSource = new MatTableDataSource<any>([]);
        }
      },
      error => console.error(error)
    );

    this.error$.subscribe(
      error => {
        if (error !== null) {
          this.toast.error(error);
        }
      }
    )
  }

  handlePageEvent(event: PageEvent): void {
    this.pageEvent = event;
    this.store.dispatch(ArticleActions.loadArticles({
      page: this.pageEvent.pageIndex,
      size: this.pageEvent.pageSize,
      status: this.statusFilter
    }));
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onStatusChange(): void {
    this.store.dispatch(ArticleActions.loadArticles({
      page: this.pageEvent.pageIndex,
      size: this.pageEvent.pageSize,
      status: this.statusFilter
    }));
  }

  openArticleAddDialog(): void {
    this.dialog.open(ArticleAddDialogComponent);
  }

  updateArticleStatus(slug: string, status: string): void {
    this.dialog.open(ArticleUpdateStatusDialogComponent, {
      data: {
        slug: slug,
        status: status
      }
    });
  }

  deleteArticle(slug: string): void {
    if (confirm("Are you sure you want to delete this article?")) {
      this.store.dispatch(ArticleActions.deleteArticle({slug}));
    }
  }
}

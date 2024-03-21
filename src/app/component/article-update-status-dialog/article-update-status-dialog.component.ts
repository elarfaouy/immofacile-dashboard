import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {ArticleActions} from "../../article/actions/article.actions";

@Component({
  selector: 'app-article-update-status-dialog',
  templateUrl: './article-update-status-dialog.component.html',
  styleUrl: './article-update-status-dialog.component.css'
})
export class ArticleUpdateStatusDialogComponent {
  selectedStatus: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { slug: string, status: string },
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.selectedStatus = this.data.status;
  }

  updateArticleStatus() {
    this.store.dispatch(ArticleActions.updateArticleStatus({
      slug: this.data.slug,
      status: this.selectedStatus
    }));
  }
}

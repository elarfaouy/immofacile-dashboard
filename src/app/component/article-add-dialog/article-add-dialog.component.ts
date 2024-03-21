import {Component} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {ArticleActions} from "../../article/actions/article.actions";
import {
  selectArticleByTitle,
  selectArticleCategories,
  selectArticleError,
  selectArticleTags
} from "../../article/selectors/article.selectors";
import {Observable} from "rxjs";
import {MatDialogRef} from "@angular/material/dialog";
import {CategoryInterface} from "../../article/models/category.interface";
import {TagInterface} from "../../article/models/tag.interface";

@Component({
  selector: 'app-article-add-dialog',
  templateUrl: './article-add-dialog.component.html',
  styleUrl: './article-add-dialog.component.css'
})
export class ArticleAddDialogComponent {
  title: string = '';
  content: string = '';
  category: number = 0;
  tagsSelected: number[] = [];
  image: File = new File([], '');
  error: Observable<string | null> = this.store.pipe(select(selectArticleError));
  categories: Observable<CategoryInterface[]> = this.store.pipe(select(selectArticleCategories));
  tags: Observable<TagInterface[]> = this.store.pipe(select(selectArticleTags));

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<ArticleAddDialogComponent>
  ) {
  }

  ngOnInit() {
    this.store.dispatch(ArticleActions.loadCategories());
    this.store.dispatch(ArticleActions.loadTags());
  }

  onImageChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.image = file;
      console.log(event.target.files);
    }
  }

  onCheckboxChange(event: any) {
    const value = event.target.value;
    if (event.target.checked && !this.tagsSelected.includes(value)) {
      this.tagsSelected.push(value);
    } else if (!event.target.checked) {
      const index = this.tagsSelected.indexOf(value);
      if (index !== -1) {
        this.tagsSelected.splice(index, 1);
      }
    }
  }

  onSubmit() {
    this.store.dispatch(ArticleActions.storeArticle({
      title: this.title,
      content: this.content,
      category: this.category,
      tags: this.tagsSelected
    }));

    this.store.pipe(select(selectArticleByTitle(this.title))).subscribe(
      article => {
        if (article) {
          if (this.image.size > 0) {
            const formData = new FormData();
            formData.append('cover', this.image);
            this.store.dispatch(ArticleActions.storeArticleImage(
              {slug: article.slug, cover: formData}
            ));
          }

          this.error.subscribe(
            error => {
              console.log(error);
              if (error == null) {
                this.dialogRef.close();
              }
            }
          );
        }
      }
    );
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleUpdateStatusDialogComponent } from './article-update-status-dialog.component';

describe('ArticleUpdateStatusDialogComponent', () => {
  let component: ArticleUpdateStatusDialogComponent;
  let fixture: ComponentFixture<ArticleUpdateStatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleUpdateStatusDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticleUpdateStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

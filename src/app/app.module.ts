import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatCheckbox, MatCheckboxModule} from "@angular/material/checkbox";
import {MatAnchor, MatButton, MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PropertiesPageComponent } from './page/properties-page/properties-page.component';
import {MatRadioButton, MatRadioGroup, MatRadioModule} from "@angular/material/radio";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatRow,
  MatTable, MatTableModule
} from "@angular/material/table";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import { ArticlesPageComponent } from './page/articles-page/articles-page.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ArticleAddDialogComponent } from './component/article-add-dialog/article-add-dialog.component';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatDivider} from "@angular/material/divider";

@NgModule({
  declarations: [
    AppComponent,
    PropertiesPageComponent,
    ArticlesPageComponent,
    ArticleAddDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatSidenavContainer,
    MatAnchor,
    MatButton,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatBottomSheetModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    MatDialogTitle,
    MatDivider,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

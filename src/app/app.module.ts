import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatSidenavContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatAnchor, MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PropertiesPageComponent} from './page/properties-page/properties-page.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ArticlesPageComponent} from './page/articles-page/articles-page.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {ArticleAddDialogComponent} from './component/article-add-dialog/article-add-dialog.component';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {PropertyModule} from "./property/property.module";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {authenticationInterceptor} from "./interceptor/authentication/authentication.interceptor";
import {MatIcon} from "@angular/material/icon";
import { PropertyUpdateStatusDialogComponent } from './component/property-update-status-dialog/property-update-status-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertiesPageComponent,
    ArticlesPageComponent,
    ArticleAddDialogComponent,
    PropertyUpdateStatusDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    PropertyModule,
    MatSidenavModule,
    MatSidenavContainer,
    MatAnchor,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIcon
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authenticationInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

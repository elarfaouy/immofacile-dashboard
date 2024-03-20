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
import {MatIconModule} from "@angular/material/icon";
import {
  PropertyUpdateStatusDialogComponent
} from './component/property-update-status-dialog/property-update-status-dialog.component';
import {DashboardPageComponent} from './page/dashboard-page/dashboard-page.component';
import {LoginPageComponent} from './page/login-page/login-page.component';
import {UserModule} from "./user/user.module";
import {ReportPageComponent} from './page/report-page/report-page.component';
import {ReportModule} from "./report/report.module";
import {
  ReportUpdateStatusDialogComponent
} from './component/report-update-status-dialog/report-update-status-dialog.component';
import {UserPageComponent} from './page/user-page/user-page.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { AgenciesPageComponent } from './page/agencies-page/agencies-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertiesPageComponent,
    ArticlesPageComponent,
    ArticleAddDialogComponent,
    PropertyUpdateStatusDialogComponent,
    DashboardPageComponent,
    LoginPageComponent,
    ReportPageComponent,
    ReportUpdateStatusDialogComponent,
    UserPageComponent,
    AgenciesPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    PropertyModule,
    UserModule,
    ReportModule,
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
    MatIconModule,
    MatTooltipModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authenticationInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

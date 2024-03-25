import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticlesPageComponent} from "./page/articles-page/articles-page.component";
import {LoginPageComponent} from "./page/login-page/login-page.component";
import {PropertiesPageComponent} from "./page/properties-page/properties-page.component";
import {DashboardPageComponent} from "./page/dashboard-page/dashboard-page.component";
import {ReportPageComponent} from "./page/report-page/report-page.component";
import {UserPageComponent} from "./page/user-page/user-page.component";
import {AgenciesPageComponent} from "./page/agencies-page/agencies-page.component";
import {authenticateGuard} from "./guard/authenticate/authenticate.guard";
import {hasRightAuthorityGuard} from "./guard/has-right-authority/has-right-authority.guard";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'dashboard', component: DashboardPageComponent, canActivate: [authenticateGuard, hasRightAuthorityGuard], data: {authority: "ROLE_ADMIN"},
    children: [
      {path: '', redirectTo: 'properties', pathMatch: 'full'},
      {path: 'properties', component: PropertiesPageComponent},
      {path: 'articles', component: ArticlesPageComponent},
      {path: 'reports', component: ReportPageComponent},
      {path: 'users', component: UserPageComponent},
      {path: 'agencies', component: AgenciesPageComponent},
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

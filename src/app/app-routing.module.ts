import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticlesPageComponent} from "./page/articles-page/articles-page.component";
import {LoginPageComponent} from "./page/login-page/login-page.component";
import {PropertiesPageComponent} from "./page/properties-page/properties-page.component";
import {DashboardPageComponent} from "./page/dashboard-page/dashboard-page.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'dashboard', component: DashboardPageComponent, children: [
      {path: '', redirectTo: 'properties', pathMatch: 'full'},
      {path: 'properties', component: PropertiesPageComponent},
      {path: 'articles', component: ArticlesPageComponent}
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

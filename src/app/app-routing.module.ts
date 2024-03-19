import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticlesPageComponent} from "./page/articles-page/articles-page.component";

const routes: Routes = [
  {path: '', redirectTo: 'properties', pathMatch: 'full'},
  {path: 'articles', component: ArticlesPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

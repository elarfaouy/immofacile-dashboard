import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PropertiesPageComponent} from "./page/properties-page/properties-page.component";

const routes: Routes = [
  {path: 'properties', component: PropertiesPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

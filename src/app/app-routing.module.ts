import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFountComponent } from './page-not-fount/page-not-fount.component';

const routes: Routes = [
  {
    path:"",redirectTo:"products",pathMatch:'full'
  },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  {
    path:"**", component:PageNotFountComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

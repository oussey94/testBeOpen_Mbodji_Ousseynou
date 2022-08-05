import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { ListProductsComponent } from './products/list-products/list-products.component';

const routes: Routes = [
  {path: "produits", component : ListProductsComponent},
  {path:"add-produit", component:AddProductComponent},
  {path: "editProduct/:id",  component: EditProductComponent},
  {path: "", redirectTo: "produits", pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

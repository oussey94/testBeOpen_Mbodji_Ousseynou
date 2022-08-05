import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  public products!: Product[];

  constructor( private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(product => {
      console.log("les product: ",product);
      this.products = product;
    });
  }

  supprimerProduct(product: Product){
    let conf=confirm("Etes vous certains de vouloir supprimé le produit ?");
    if(conf){
      this.productService.deleteProduct(product.id).subscribe(() => {
        this.supprimerProduitDuTableau(product);
      });
    }
  }

  supprimerProduitDuTableau(p: Product){
    this.products.forEach((curr, index) => {
      if(p.id === curr.id){
        this.products.splice(index, 1);
      }
    });
  }

}

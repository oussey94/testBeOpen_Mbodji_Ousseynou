import { Product } from './../../models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public current_Product = new Product();
  productForm!: FormGroup;

  constructor(
     private productService: ProductService,
     private fb: FormBuilder,
     private activatedRoute : ActivatedRoute, 
     private router : Router
     ) { }

  ngOnInit(): void {

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      categorie: ['', Validators.required]
    });

    this.productService.getProductById(this.activatedRoute.snapshot.params['id']).subscribe((product: Product) =>{
      this.displayProduct(product);
    });
  }

  public updateProduct(): void {
    //console.log("ajouterrr: ",this.productForm.value)
    if(this.productForm.valid){
      if(this.productForm.dirty){
        const product : Product = {
          ...this.current_Product,
          ...this.productForm.value
        };

        this.productService.updateProduct(this.activatedRoute.snapshot.params['id'],product).subscribe({
          next :() => this.saveCompleted(),
          error: (err) => { alert("Probléme lors de la modification !"); }
        });
      }
    }
  }

  public saveCompleted(): void {
    this.productForm.reset();
    this.router.navigate(['/produits']);
  }

  public displayProduct(product: Product): void {
    console.log("prodddddddd:",product);
    this.current_Product = product;

    this.productForm.patchValue({
      name: this.current_Product.name,
      description: this.current_Product.description,
      price: this.current_Product.price,
      categorie:this.current_Product.categorie
    });
  }


}

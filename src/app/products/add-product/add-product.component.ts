import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from './../../models/product.model';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public newProduct = new Product();
  productForm!: FormGroup;

  constructor(
    private productService: ProductService,
     private fb: FormBuilder,
     private router : Router
     ) { }

  ngOnInit(): void {

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      categorie: ['', Validators.required]
    });
  }

  public ajouterProduct(): void {
    console.log("ajouterrr: ",this.productForm.value)
    if(this.productForm.valid){
      if(this.productForm.dirty){
        const product : Product = {
          ...this.newProduct,
          ...this.productForm.value
        };

        this.productService.addProduct(product).subscribe({
          next :() => this.saveCompleted(),
          error: (err) => { alert("Probléme lors de l'ajout !"); }
        });
      }
    }
  }

  public saveCompleted(): void {
    this.productForm.reset();
    this.router.navigate(['/produits']);
  }

}

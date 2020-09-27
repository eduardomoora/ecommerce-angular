import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductsService } from "../shared/services/products.service";
import { Products } from '../shared/models/products';

@Component({
  selector: "ed-product-edit",
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.css"],
})
export class ProductEditComponent implements OnInit {
  title:string = 'Edit Product';
  submit:string = 'Save';
  product:Products;
  id: string;
  constructor(
    private servicesProduct: ProductsService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get('id')
    this.servicesProduct.get(this.id).subscribe((data:Products)=>{
     this.product=data;
    })

  // this.getId();
  }


  onSubmit(product:Products): void {
      this.servicesProduct.editProduct(product, this.id).subscribe((data) => {
        this.router.navigateByUrl("products");
        //confirm by message
        this.snackBar.open("Product was edited successfully", "Close", {
          duration: 2000,
        });
      });
  
  }
  cancel() {
    this.router.navigateByUrl("products");
  }

  getId(): void {
    this.id = this.activeRoute.snapshot.paramMap.get('id')
    this.servicesProduct.get(this.id).subscribe((data:Products)=>{
     this.product=data;
    })
  }
}

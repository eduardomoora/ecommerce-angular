import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ProductsService } from "../shared/services/products.service";
import { Products } from "../shared/models/products";

@Component({
  selector: "ed-product-add",
  templateUrl: "./product-add.component.html",
  styleUrls: ["./product-add.component.css"],
})
export class ProductAddComponent implements OnInit {
  title: string = "Add New Product";
  submit: string = "Create";
  constructor(
    private servicesProduct: ProductsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  addProduct(product: Products): void {
    this.servicesProduct.addProduct(product).subscribe((data) => {
      this.router.navigateByUrl("products");
      //confirm by message
      this.snackBar.open("Product added successfully", "Close", {
        duration: 2000,
      });
    });
  }
  cancel() {
    this.router.navigateByUrl("products");
  }
}

import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Products } from "../shared/models/products";
import { ProductsService } from "../shared/services/products.service";
import { ConfirmDialogComponent } from "../../shared/components/confirm-dialog/confirm-dialog.component";
import { ConfirmDialogModel } from "../../shared/models/confirm-dialog-model";
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: "ed-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  products: Products[];
  constructor(
    private productsServices: ProductsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsServices.getAll()
    
    .pipe(
      catchError(error =>{
        this.snackBar.open('Cannot get Products at this time, Please try again later',null,{
             duration:4000
        });
        return EMPTY;
      })
    )
    .subscribe((data: Products[]) => {
      this.products = data;
    });
  }

  delete(id: string): void {
    //teniendo la instancia del dialgo se pueden usar sus funciones y open es una para mandar los parametros
    //  se le va a  mandar un conponente anteriormente creado
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "600px",
      data: <ConfirmDialogModel>{
        title: "Delete Product",
        message: "Are you sure to delete this item?",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteProduct(id);
      }
    });
  }
  deleteProduct(id: string) {
    this.productsServices.deleteProduct(id).subscribe((data) => {
      this.snackBar.open("Item has beeen deleted", "", {
        duration: 2000,
      });
      this.getProducts();
    });
  }
}

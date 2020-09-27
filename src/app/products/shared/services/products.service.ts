import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import {catchError } from 'rxjs/operators';
import { Products } from '../models/products';

const URL="http://localhost:3000/products"

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }



  getAll():Observable<Products[]>{
    return this.httpClient.get<Products[]>(`${URL}`)
    .pipe(
      catchError(this.handleError)
    )
  }

  addProduct(product:Products):Observable<Products>{

    return this.httpClient.post<Products>(`${URL}`,product)
    .pipe(
      catchError(this.handleError)
    )
  }

 get(id: string):Observable<Products>{
    // products/:id
    return this.httpClient.get<Products>(`${URL}/${id}`)
    .pipe(
      catchError(this.handleError)
    )
  }

  editProduct(product:Products,id: string):Observable<Products>{
    // products/id
    return this.httpClient.put<Products>(`${URL}/${id}`,product)
    .pipe(
      catchError(this.handleError)
    )
  }
  deleteProduct(id: string):Observable<Products>{
    // products/id
    return this.httpClient.delete<Products>(`${URL}/${id}`)
    .pipe(
      catchError(this.handleError)
    )
  }

 private handleError(error :HttpErrorResponse){
   if(error.error instanceof ErrorEvent){
     console.log('Client error',error.error.message);
   }else{
    console.log('Error Status',error.status);
    console.log('error',error.error);
   }
   return throwError('Cannot perform the request, please try later')
 }
}

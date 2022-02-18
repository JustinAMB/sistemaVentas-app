import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';
import { Resp } from '../interfaces/resp';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl:string=environment.api;
  products!:Product[];
  constructor(private http:HttpClient) {
    this.getProducts().subscribe();
   }
  


  get token():string{
    return localStorage.getItem('token') || '';
  }
  get headers(){
    return{
      headers:{
        'x-access-token':this.token
      }
    }
  }
  addProduct(product:Product):Observable<Resp> {
    const url=`${this.baseUrl}product/`; 
    return this.http.post<Resp>(url,{...product},this.headers).pipe(
      catchError(err=>{
        console.log(err);
        return of(err.error)
      })  ,

      delay(1500)
    );

  }
  activeProduct(id:number,status:boolean):Observable<Resp> {
    const url=`${this.baseUrl}product/${id}?is_active=${status}`;; 
    return this.http.post<Resp>(url,{},this.headers).pipe(
      catchError(err=>{
        console.log(err);
        return of(err.error)
      })  ,

      delay(1500)
    );

  }
  editproduct(product:Product):Observable<Resp> {
    const url=`${this.baseUrl}product/${product.id}`; 
    return this.http.put<Resp>(url,{...product},this.headers).pipe(
      catchError(err=>{
        console.log(err);
        return of(err.error)
      })  ,

      delay(1500)
    );

  }

  getProduct(id:number):Observable<Resp> {
    const url=`${this.baseUrl}product/${id}`; 
    return this.http.get<Resp>(url,this.headers).pipe(
      catchError(err=>{
        console.log(err);
        return of(err.error)
      })  
    );

  }
  getProducts(state:boolean=true):Observable<Resp> {
    const url=`${this.baseUrl}product/?is_active=${state}`; 
    return this.http.get<Resp>(url,this.headers).pipe(
      tap(resp=>{
        if(resp.ok===true){
          this.products=resp.data;
        }
       
      }),
      catchError(err=>{
        console.log(err);
        return of(err.error)
      })  ,

      delay(1500)
    );

  }

  searchInventary(term:string=''):Observable<Resp> {
    const url=`${this.baseUrl}product/searchInventary/?term=${term}`; 
    return this.http.get<Resp>(url,this.headers).pipe(
      catchError(err=>{
        console.log(err);
        return of(err.error)
      })  ,

      delay(800)
    );

  }

  
}

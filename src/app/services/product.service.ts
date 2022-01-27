import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';
import { Resp } from '../interfaces/resp';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl:string=environment.api;
  constructor(private http:HttpClient) { }
  


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
    return this.http.post<Resp>(url,{...product},this.headers);

  }
  activeProduct(id:number,status:boolean):Observable<Resp> {
    const url=`${this.baseUrl}product/${id}?is_active=${status}`;; 
    return this.http.post<Resp>(url,{},this.headers);

  }
  editproduct(product:Product):Observable<Resp> {
    const url=`${this.baseUrl}product/${product.id}`; 
    return this.http.put<Resp>(url,{...product},this.headers);

  }

  getProduct(id:number):Observable<Resp> {
    const url=`${this.baseUrl}product/${id}`; 
    return this.http.get<Resp>(url,this.headers);

  }
  getProducts():Observable<Resp> {
    const url=`${this.baseUrl}product/`; 
    return this.http.get<Resp>(url,this.headers);

  }
}

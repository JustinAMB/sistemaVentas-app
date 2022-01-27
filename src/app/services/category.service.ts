import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../interfaces/category';
import { Resp } from '../interfaces/resp';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
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
  addCategory(category:Category):Observable<Resp> {
    const url=`${this.baseUrl}category/`; 
    return this.http.post<Resp>(url,{...category},this.headers);

  }

  editCategory(category:Category):Observable<Resp> {
    const url=`${this.baseUrl}category/${category.id}`; 
    return this.http.put<Resp>(url,{...category},this.headers);

  }

  getCategory(id:number):Observable<Resp> {
    const url=`${this.baseUrl}category/${id}`; 
    return this.http.get<Resp>(url,this.headers);

  }
  getCategorys():Observable<Resp> {
    const url=`${this.baseUrl}category/`; 
    return this.http.get<Resp>(url,this.headers);

  }



}

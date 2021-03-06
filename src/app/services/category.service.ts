import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
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
    return this.http.post<Resp>(url,{...category},this.headers).pipe(
      catchError(err=>{
        console.log(err);
        return of(err.error)
      })  ,

      delay(1500)
    );

  }

  editCategory(category:Category):Observable<Resp> {
    const url=`${this.baseUrl}category/${category.id}`; 
    return this.http.put<Resp>(url,{...category},this.headers).pipe(
      catchError(err=>{
        console.log(err);
        return of(err.error)
      })  ,

      delay(1500)
    );

  }
  activeCategory(id:number,state:boolean):Observable<Resp> {
    const url=`${this.baseUrl}category/active/${id}`; 
    return this.http.put<Resp>(url,{state},this.headers).pipe(
      catchError(err=>{
        console.log(err);
        return of(err.error)
      })  ,

      delay(1500)
    );

  }

  getCategory(id:number):Observable<Resp> {
    const url=`${this.baseUrl}category/${id}`; 
    return this.http.get<Resp>(url,this.headers).pipe(
      catchError(err=>{
        console.log(err);
        return of(err.error)
      })  
    );


  }
  getCategorys(state:boolean):Observable<Resp> {

    const url=`${this.baseUrl}category/?state=${state}`; 
    return this.http.get<Resp>(url,this.headers).pipe(
      catchError(err=>{
        console.log(err);
        return of(err.error)
      })  ,

      delay(1500)
    );

  }



}

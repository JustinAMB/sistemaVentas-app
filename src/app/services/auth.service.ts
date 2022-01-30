import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Resp } from '../interfaces/resp';
import { User } from '../interfaces/user';
import { Observable, of } from 'rxjs';

import {catchError, map, tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user!:User
  
  

  private baseUrl:string=environment.api;
  constructor(private http:HttpClient) { }
  
  get user():User{
    return {...this._user};
  }

  get token():string{
    return localStorage.getItem('token') || '';
  }
  get headers(){
    return{
      headers:{
        'x-access-token':this.token,
      }
    }
  }
  login(email:string, password:string):Observable<Resp>{
    const body={
      email,
      password
    }
    const url=`${this.baseUrl}user/signIn`;

    console.log(url);
    return this.http.post<Resp>(url,body,this.headers).pipe(
      tap((resp:Resp)=>{
        console.log(resp);
        if(resp.ok){
          localStorage.setItem('token',resp.data.token);
          console.log(resp.data.user);
          
          this._user=resp.data.user as User;
          localStorage.setItem('id',String(this.user.id));
          console.log(this.user);
        }
  
      }),
      catchError(err=>{
        console.log(err);
        return of(err.error)
      })  
    );
  }
  validateToken():Observable<boolean>{
    
    const id=localStorage.getItem('id') || 0;.7
    const url=`${this.baseUrl}user/${id}`;
    return this.http.get<Resp>(url,this.headers).pipe(
      map(resp=>{
        this._user=resp.data as User;
        return resp.ok
      }),
      catchError(err=>of(false))
    );
  }
  logout(){
    localStorage.removeItem('token');
    this._user=this.getUser();
  }
  getUser():User{
    return {
      id:0,
      name:'',
      email:'',
      rol:0,
      image:'',
      lastname:''
    }
  }
}

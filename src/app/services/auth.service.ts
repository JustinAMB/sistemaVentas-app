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
  private _user!:User;
  
  

  private baseUrl:string=environment.api;
  constructor(private http:HttpClient) { }
  
  get user():User{
    return this._user;
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
  login(email:string, password:string):Observable<Resp>{
    const body={
      email,
      password
    }
    const url=`${this.baseUrl}auth/signup`;

    
    return this.http.post<Resp>(url,body).pipe(
      tap((resp:Resp)=>{
        if(resp.ok){
          localStorage.setItem('token',resp.data.token);
          this._user=resp.data.user as User;
        }
  
      }),
      catchError(err=>of(err.error))
    );
  }
  validateToken():Observable<boolean>{
    const url=`${this.baseUrl}user/${this._user.id}`;
    return this.http.get<Resp>(url,this.headers).pipe(
      map(resp=>resp.ok),
      catchError(err=>of(false))
    );
  }
  logout(){
    localStorage.removeItem('token');
    
  }
}

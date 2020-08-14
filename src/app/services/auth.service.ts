import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario.model';

import * as jwt_decode from 'jwt-decode';
import { DecodeToken } from '../models/decodeToken.model';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  authenticationState = new BehaviorSubject(false);
  decodeToken: DecodeToken = null;

  constructor(
    private http: HttpClient
  ) {

      if(localStorage.getItem('token')){
         this.authenticationState.next(true);
         this.decodeToken = jwt_decode(localStorage.getItem('token'))
      }

   }

   //decodeToken function
   getUserOnToken(): Usuario{
      if(localStorage.getItem('token')){
         let decodeToken = jwt_decode(localStorage.getItem('token'))
         return decodeToken.usuario
      };

   }

   login(data: any) {
      return this.http.post(environment.endpoint +'/auth/login', data);
   }

   logout(){
      localStorage.removeItem('token');
      this.authenticationState.next(false);
      this.decodeToken = null;
   }

   // cambia el estado a TRUE
   authenticate(){
      this.authenticationState.next(true);
   }

   // retorna el estado del login OBSERVABLE
   isAuthenticate(){
      return this.authenticationState
   }

   // retorna estado del login TRUE o FALSE
   isAuthenticated(){
      return this.authenticationState.value
   }

   // si es un usuario logueado
   isAuthenticatedUser(){
      let decodeToken = jwt_decode(localStorage.getItem('token'))
      if (this.authenticationState.value && decodeToken.usuario.rol == 2 ) {
         return true;
      }
      return false;
   }

   // si es un admin
   isAuthenticatedAdmin(){
      let decodeToken = jwt_decode(localStorage.getItem('token'))
      if (this.authenticationState.value && decodeToken.usuario.rol == 1 ) {
         return true;
      }
      return false;
   }

   registerUser(data) {
      return this.http.post(environment.endpoint +'/auth/register/', data);
    }

   userExistInDB(name: string){
      return this.http.get(environment.endpoint +'/auth/checkUsername/'+ name);
   }


} // end class

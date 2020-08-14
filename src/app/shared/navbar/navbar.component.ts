import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';

import * as jwt_decode from 'jwt-decode';
import { DecodeToken } from '../../models/decodeToken.model';

const pathImage = `${environment.endpoint}/images/usuarios/`;
const configSnack = environment.configSnackBar;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit {

  pathImage: string = pathImage;

  buttonsCommon = [
   { text: 'Inicio', link: '/' },
   { text: 'Catalogo', link: 'catalogo' }
  ];

  buttonsAdmin = [];
  buttonsCategorias = [];
  buttonsUser = [];
  isLoginUser = false
  isLoginAdmin = false

  usuario: Usuario = null;

  constructor(
    public authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {

      this.authService.isAuthenticate().subscribe( state => {

         // esta logueado
         if(state) {

            // let decodeToken: DecodeToken = jwt_decode(localStorage.getItem('token'));
            this.usuario = authService.getUserOnToken();

            // si es ROL USUARIO
            if (this.usuario.rol == 0) {
               this.isLoginUser = true

               this.buttonsUser = [
                  { text: 'Perfil', link: 'perfil' },
                  { text: 'Mis Compras', link: 'compras' }
               ]
            }

            // si ROL ADMIN
            if (this.usuario.rol == 1) {
               this.isLoginAdmin = true

               this.buttonsAdmin = [
                  { text: 'Productos', link: 'productos' },
                  { text: 'Usuarios', link: 'usuarios' },
                  { text: 'Ventas', link: 'ventas' }
               ];
               this.buttonsCategorias = [
                  { text: 'Categorias', link: '/categorias' },
                  { text: 'Subcategorias', link: '/subcategorias' }
               ];

            }

         // no esta logueado
         } else {
         this.isLoginUser = false;
         this.isLoginAdmin = false;

         this.buttonsAdmin = [];
         this.buttonsUser = [];
         this.buttonsCategorias = [];
         }

      })

   }

   ngOnInit(){

   }

   logout(){
      this.authService.logout();
      this.router.navigate(['/']);
      this.openSnackBar("Se ha deslogueado correctamente");
   }

   openSnackBar(mensaje:string) {
      this.snackBar.open(mensaje,"", {
         duration: configSnack.duration,
         horizontalPosition: configSnack.x,
         verticalPosition: configSnack.y
      });
   }


} // end class


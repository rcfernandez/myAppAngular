import { Component, OnInit, Host, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';
import { UiService } from 'src/app/services/ui.service';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit {

   pathImage: string = environment.endpoint + '/images/usuarios/';

   buttonsCommon = [
      { text: 'Inicio', link: 'home' },
      { text: 'Catalogo', link: 'catalogo' },
      { text: 'Quienes somos', link: 'quienes' },
      // { text: 'Nuestra Historia', link: 'historia' }
   ];

   buttonsAdmin = [];
   buttonsCategorias = [];
   buttonsUser = [];
   isLoginUser = false
   isLoginAdmin = false

   usuario: Usuario = null;

   @Input() inputSideNav: MatSidenav;

   constructor(
      public authService: AuthService,
      private router: Router,
      private uiService: UiService
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
      this.uiService.popup('Se ha deslogueado correctamente', 'ok');
   }


} // end class


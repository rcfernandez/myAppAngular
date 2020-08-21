import { Component, Host } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Usuario } from './models/usuario.model';
import { environment } from 'src/environments/environment';
import { UiService } from './services/ui.service';

@Component({
   selector: 'app-root', // nombre del componente, sera llamado con <app-root></app-root>
   templateUrl: './app.component.html', // HTML del componente
   styleUrls: ['./app.component.scss'] // CSS del componente
})


export class AppComponent {

   buttonsAdmin = [];
   buttonsCategorias = [];
   buttonsUser = [];
   isLoginUser = false
   isLoginAdmin = false

   pathImage: string = environment.endpoint + '/images/usuarios/';

   usuario: Usuario = null;

   constructor (
      public authService: AuthService,
      private router: Router,
      private uiService: UiService
   ) {


      this.authService.isAuthenticate().subscribe( state => {

         // esta logueado
         if(state) {

            this.usuario = authService.getUserOnToken();

            // si es ROL USUARIO
            if (this.usuario.rol == 0) {
               this.isLoginUser = true

               this.buttonsUser = [
                  { text: 'Mis Compras', link: 'compras' },
                  { text: 'Perfil', link: 'perfil' }
               ]
            }

            // si ROL ADMIN
            if (this.usuario.rol == 1) {
               this.isLoginAdmin = true;

               this.buttonsUser = [
                  { text: 'Mis Compras', link: 'compras' },
                  { text: 'Perfil', link: 'perfil' }
               ]

               this.buttonsAdmin = [
                  { text: 'Productos', link: 'productos' },
                  { text: 'Usuarios', link: 'usuarios' },
                  { text: 'Ventas', link: 'ventas' },
                  { text: 'Categorias', link: '/categorias' },
                  // { text: 'Subcategorias', link: '/subcategorias' }
               ];
               // this.buttonsCategorias = [
               //    { text: 'Categorias', link: '/categorias' },
               //    { text: 'Subcategorias', link: '/subcategorias' }
               // ];

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


   } // constructor


   logout(){
      this.authService.logout();
      this.router.navigate(['/']);
      this.uiService.popup('Se ha deslogueado correctamente', 'ok');
   }

}


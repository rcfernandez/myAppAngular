import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from './pages/login/login.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';

import { TableListComponent } from './components/table-list/table-list.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { DatatablaComponent } from './components/datatabla/datatabla.component';
import { SubcategoriasComponent } from './pages/subcategorias/subcategorias.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { AuthGuard } from './guards/auth.guard';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { ComprasComponent } from './pages/compras/compras.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { QuienesSomosComponent } from './pages/quienes-somos/quienes-somos.component';
import { NuestraHistoriaComponent } from './pages/nuestra-historia/nuestra-historia.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'usuarios', canActivate:[AuthAdminGuard], component: UsuarioComponent },
  { path: 'productos', canActivate:[AuthGuard, AuthAdminGuard], component: ProductosComponent },
  { path: 'categorias', canActivate:[AuthAdminGuard], component: CategoriasComponent },      // solo se muestra para el admin, en postman se mostrara
  { path: 'subcategorias', canActivate:[AuthAdminGuard], component: SubcategoriasComponent },  // solo admin
  { path: 'ventas', component: VentasComponent },
  { path: 'quienes', component: QuienesSomosComponent },
  { path: 'historia', component: NuestraHistoriaComponent },

  { path: 'table-list', component: TableListComponent },
  { path: 'DatatablaComponent', component: DatatablaComponent },
  { path: 'checkout/:idProducto', canActivate:[AuthGuard], component: CheckoutComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'perfil', canActivate:[AuthGuard], component: PerfilComponent },
  { path: 'compras', canActivate:[AuthGuard], component: ComprasComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [
    // RouterModule.forRoot(routes),
    RouterModule.forRoot(routes,{
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'top',
    })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

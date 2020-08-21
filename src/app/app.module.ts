import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // *2 hay que agregarlo para que funcione el 'ngModel'
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableListComponent } from './components/table-list/table-list.component';

import { HomeComponent } from './pages/home/home.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { LoginComponent } from './pages/login/login.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { MaterialTableComponent } from './components/material-table/material-table.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DatatablaComponent } from './components/datatabla/datatabla.component';

import { MaterialModule } from "./modules/material/material.module";
import { FooterComponent } from './shared/footer/footer.component';

import { FileUploadModule  } from "ng2-file-upload";
import { SubcategoriasComponent } from './pages/subcategorias/subcategorias.component';

import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { DialogElementComponent } from './components/dialog-element/dialog-element.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

import { MatStepperModule } from '@angular/material/stepper';
import { StatusFormComponent } from './components/status-form/status-form.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { CardProductoComponent } from './components/card-producto.component';
import { InterceptorsService } from './interceptors.service';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { TituloComponent } from './components/titulo.component';
import { DialogRegistrarmeComponent } from './components/dialog-registrarme/dialog-registrarme.component';
import { CardComprasComponent } from './components/card-compras.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { QuienesSomosComponent } from './pages/quienes-somos/quienes-somos.component';
import { NuestraHistoriaComponent } from './pages/nuestra-historia/nuestra-historia.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    UsuarioComponent,
    ProductosComponent,
    CategoriasComponent,
    TableListComponent,
    VentasComponent,
    MaterialTableComponent,
    DatatablaComponent,
    FooterComponent,
    SubcategoriasComponent,
    DialogElementComponent,
    CheckoutComponent,
    StatusFormComponent,
    CatalogoComponent,
    CardProductoComponent,
    SnackbarComponent,
    PerfilComponent,
    ComprasComponent,
    TituloComponent,
    DialogRegistrarmeComponent,
    CardComprasComponent,
    NotFoundComponent,
    QuienesSomosComponent,
    NuestraHistoriaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // *2 hay que agregarlo para que funcione el 'ngModel'
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    HttpClientModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    MaterialModule,
    FileUploadModule,
    NgxMatFileInputModule,
    MatStepperModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorsService, multi: true }
  ],
  bootstrap: [
    AppComponent, // este es el default
    // PruebaComponent, // *1 para que empiece con este modulo
  ],
})
export class AppModule {}

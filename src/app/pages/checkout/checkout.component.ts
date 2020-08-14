import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, MinLengthValidator} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/models/producto.model';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Categoria } from 'src/app/models/categoria.model';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuario.model';
import { VentasService } from 'src/app/services/ventas.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';


const pathImageUsuario = `${environment.endpoint}/images/usuarios/`
const pathImageProducto = `${environment.endpoint}/images/productos/`


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})

export class CheckoutComponent implements OnInit {

  idProducto: string = ""
  producto: Producto = new Producto();
  categoria: Categoria = null;
  pathImageUsuario = pathImageUsuario;
  pathImageProducto = pathImageProducto;

  cantidadTotalForm: FormGroup;
  medioDePagoForm: FormGroup;
  ventaForm: FormGroup;

  usuario: Usuario = null;

  mediosDePago = [
     {
        value: 1,
        text: "Efectivo"
     },
     {
        value: 2,
        text: "Mercado Pago"
     }
  ]

  classOk: string = '';

  constructor(
      private fb: FormBuilder,
      private productosService: ProductosService,
      private categoriaService: CategoriasService,
      private rutaActiva: ActivatedRoute,
      public dialog: MatDialog,
      private ventasService: VentasService,
      private authService: AuthService,
      private uiService: UiService

  ) {
    this.dialog.closeAll();
    this.idProducto = this.rutaActiva.snapshot.params.idProducto;
    this.prepareForm();

   }

   ngOnInit(): void {
      this.traerProducto();
      this.traerUsuario();
   }

  traerProducto(){

   this.productosService.getProductosById(this.idProducto).subscribe( res => {
      this.producto = res as Producto;

      this.categoriaService.getCategoriaById(this.producto.categoria).subscribe( cat => {
         this.categoria = cat["data"] as Categoria;
      });

      this.cantidadTotalForm.get("total").setValue(this.producto.precio);
      this.ventaForm.get("total").setValue(this.producto.precio);

      this.llenarFormVenta();

   });

  }

   traerUsuario(){
      this.usuario = this.authService.getUserOnToken();

      const { _id, usuario, nombre, apellido, email, telefono, imagen } = this.usuario;
      let newUsuario = new Object({ _id, usuario, nombre, apellido, email, telefono, imagen});
      this.ventaForm.get("usuario").setValue(newUsuario);

   }

   prepareForm(){
      this.cantidadTotalForm = this.fb.group({
         cantidad: [1, [Validators.required, Validators.min(1)]],
         total: [0],
   });

    this.medioDePagoForm = this.fb.group({
      medio: [0, Validators.required]
    });

    this.ventaForm = this.fb.group({
      fecha: [''],
      usuario: [''],
      producto: [''],
      cantidad:[1],
      total: [0],
      medio: ['', Validators.required],
      estado: [0],
    });
  }

   llenarFormVenta(){

      const { _id, nombre, descripcion, precio, categoria, imagen } = this.producto
      let newProducto = new Object({ _id, nombre, descripcion, precio, categoria, imagen })

      // guardo newProducto
      this.ventaForm.get("producto").setValue(newProducto);

      // cambio la cantidad de venta, si cambia cantidad en el form
      this.cantidadTotalForm.get('cantidad').valueChanges.subscribe( () => {
         this.ventaForm.get('cantidad').setValue(this.cantidadTotalForm.get('cantidad').value);
      });

      // total = precio * cantidad
      this.cantidadTotalForm.get("cantidad").valueChanges.subscribe( () => {
         this.cantidadTotalForm.get("total").setValue( this.producto.precio * this.cantidadTotalForm.get("cantidad").value );
      })

      // total
      this.cantidadTotalForm.get('total').valueChanges.subscribe( () => {
         this.ventaForm.get('total').setValue(this.cantidadTotalForm.get('total').value);
      });

      // lleno el medio de pago cuando seleccione uno OK
      this.medioDePagoForm.get('medio').valueChanges.subscribe( () => {
         this.ventaForm.get('medio').setValue(this.medioDePagoForm.get('medio').value)
      });

   }

  realizarVenta(){
     if (confirm("Confirmar compra?")) {
        this.ventaForm.get('fecha').setValue(Date.now())
        this.ventasService.create(this.ventaForm.value).subscribe( res => {
            res['status'] == 'ok' ? this.uiService.popup(res['message'], 'ok') : this.uiService.popup(res['message'], 'error');
            this.classOk = "animate__animated animate__bounceInUp";
        });
     }

  }


} // end class

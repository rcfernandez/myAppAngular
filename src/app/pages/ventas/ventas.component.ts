import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { VentasService } from 'src/app/services/ventas.service';
import { Venta } from 'src/app/models/venta.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Producto } from 'src/app/models/producto.model';
import { Dato } from 'src/app/models/dato.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { UiService } from 'src/app/services/ui.service';

const pathFolder = './public/images/ventas/';
const UrlUpload = `${environment.endpoint}/upload?path=${pathFolder}`;
const pathImage = `${environment.endpoint}/images/productos/`;


@Component({
   selector: 'app-ventas',
   templateUrl: './ventas.component.html',
   styleUrls: ['./ventas.component.scss'],
})

export class VentasComponent implements OnInit {

   ventas: Venta[];
   productos: Producto[];
   usuarios: Usuario[];
   myForm: FormGroup;
   dato: Dato = new Dato;
   columns=[];

   public uploader: FileUploader = new FileUploader({ url: UrlUpload, itemAlias: "photo" });
   pathImage: string = pathImage;
   imagenSeleccionada: string = "placeholder-image.png"
   changeImage: Boolean = false;


   constructor(
      public ventasService: VentasService,
      public productosService: ProductosService,
      public usuariosService: UsuariosService,
      private fb: FormBuilder,
      private uiService: UiService
   ) {

      this.prepareForm();
      this.Columns();
   }

   ngOnInit(): void {
         this.traerUsuarios();
         this.traerProductos();
         this.traerVentasPaginado();
         this.setPage({ offset: 0 });
   }

   prepareForm(){
      this.myForm = this.fb.group({
         _id: [''],
         fecha: [Validators.required],
         usuario: ['', Validators.required],
         producto: ['', Validators.required],
         cantidad: [''],
         total: [0, Validators.required],
         medio: [0, Validators.required], // 1 = efectivo; 2 = mercado pago
         estado: [0],    // 0 = sin pagar; 1 = pagado
      });
   }

   Columns(){
      this.columns = [
         { name:'Usuario',prop:'usuario.usuario' },
         { name:'Producto', prop:'producto.nombre' },
         { name:'Cantidad', prop:'cantidad' },
         { name:'Total', prop:'total' },
      ]
   }

   onChange(event){
         if(event.type == 'change'){
         this.changeImage = true;
         }
      }

   onActivate(event) {
      if(event.type == 'click') {
         this.cargarForm(event.row);
         this.changeImage = false;
         // this.ventasService.selectedVenta = event.row
      }
   }

   cargarForm(venta: Venta) {
      this.myForm = this.fb.group({
      _id: [venta._id],
      fecha: [venta.fecha],
      usuario: [venta.usuario.usuario],
      producto: [venta.producto.nombre],
      cantidad: [venta.cantidad],
      total: [venta.total],
      medio: [venta.medio],
      estado: [venta.estado]
      });
      this.imagenSeleccionada = venta.producto.imagen.filename;
   }

   resetForm() {
      this.myForm.reset();
      this.imagenSeleccionada = 'placeholder-image.png';
      this.changeImage = false;
      // this.ventasService.getVentasPaginado();
      this.setPage(this.dato.page);

   }

   setPage(pageInfo){
      this.ventasService.getVentasPaginado(pageInfo).subscribe( res =>{
         this.dato = res['data'] as Dato;
         this.dato.page = pageInfo["offset"];
      })
   }

   traerVentasPaginado() {
      this.ventasService.getVentasPaginado().subscribe( res => {

         this.dato = res["data"] as Dato;
      });
   }

   traerUsuarios() {
      this.usuariosService.getUsuarios().subscribe((res) => {
         this.usuarios = res["data"] as Usuario[];
      });
   }

   traerProductos() {
      this.productosService.getProductos().subscribe((data) => {
         this.productos = data as Producto[];
      });
   }

   alta() {
      // agrega imagen
      if(this.changeImage){
         this.uploader.uploadAll();
         this.uploader.onCompleteItem = ( item: any, response: any, status: any, headers: any) => {
            let json = JSON.parse(response);
            this.myForm.get('imagen').setValue(json["data"]);
            this.modificar();
            console.log(`ALTA: ${this.myForm.value}`);
         };
      }
      // no agrega imagen
      else {
      this.modificar();
      console.log(`paso sin guardar imagen`);
      }
   }

   modificar(){
      this.ventasService.update(this.myForm.controls["_id"].value, this.myForm.value).subscribe( res => {
         if(res['status'] == 'success') {
            this.uiService.popup(res['message'], 'ok');
            this.setPage(this.dato.page);


         } else {
            this.uiService.popup(res['message'], 'error');
         }

      });

   }

   borrar(id: string) {
      if (confirm('Estas seguro de querer borrarlo?')) {
         this.ventasService.delete(id).subscribe(() => {
            this.resetForm();
         });
      }
   }




}/*clase ventas*/

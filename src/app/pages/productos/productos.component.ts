import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../../services/categorias.service';
import { Producto } from '../../models/producto.model';
import { Categoria } from 'src/app/models/categoria.model';
import { Dato } from 'src/app/models/dato.model';
import { FileUploader } from 'ng2-file-upload';
import { UiService } from 'src/app/services/ui.service';

const UrlUpload = "http://localhost:3000/productos/upload"
const pathImage = "http://localhost:3000/images/productos/"

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {

   myForm: FormGroup;
   dato: Dato = new Dato();
   columns=[];

   //Instanciar uploader
   public uploader: FileUploader = new FileUploader({ url: UrlUpload, itemAlias: "photo" });
   pathImage = pathImage;
   imagenSeleccionada = "placeholder-image.png"
   changeImage: Boolean = false;

   productos: Producto[];
   categorias: Categoria[];

   constructor(
      public productosService: ProductosService,
      public categoriasService: CategoriasService,
      private fb: FormBuilder,
      private uiService: UiService
      ) {
         this.prepareForm();
         this.prepareColumns()
         this.traerCategorias();
         }

   ngOnInit(): void {
      this.traerProductosPaginado();
      this.setPage({ offset: 0 }); //SetPage en base a una pagina consulta productos a express
   }

   prepareForm(){
      this.myForm = this.fb.group({
         _id: [''],
         nombre: ['', Validators.required],
         descripcion: ['', Validators.required],
         sku: ['', Validators.required],
         precio: [''],
         oferta: [''],
         cantidad: [''],
         categoria: [''],
         destacado: [''],
         imagen:[''],
      });
   }

   prepareColumns(){
      this.columns=[
         { name:'Nombre', prop:'nombre' },
         // { name:'Descripcion',prop:'descripcion' },
         { name:'SKU',prop:'sku' },
         { name:'Precio', prop:'precio' },
         { name:'Oferta', prop:'oferta' },
         { name:'Stock',prop:'cantidad' },
         { name:'Categoria',prop:'categoria.descripcion' },
         { name:'Destacado',prop:'destacado' },
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
      }
   }

   cargarForm(producto: Producto) {
      this.myForm = this.fb.group({
         _id: [producto._id],
         nombre: [producto.nombre, Validators.required],
         descripcion: [producto.descripcion, Validators.required],
         sku: [producto.sku, Validators.required],
         precio: [producto.precio],
         oferta: [producto.oferta],
         cantidad: [producto.cantidad],
         categoria: [producto.categoria._id],
         destacado: [producto.destacado],
         imagen: [producto.imagen],
      });
      this.imagenSeleccionada = producto.imagen.filename;
   }

   resetForm() {
      this.myForm.reset();
      this.imagenSeleccionada = 'placeholder-image.png';
      this.changeImage = false;
      this.setPage(this.dato.page)
   }

   setPage(pageInfo){
      this.productosService.getProductosPaginado(pageInfo).subscribe( res =>{
         if(res['status'] == 'success') {
            this.dato = res['data'] as Dato;
            this.dato.page = pageInfo["offset"];
         } else {
            this.uiService.popup(res['message'], 'error');
         }
      })
   }


   traerProductosPaginado() {
      this.productosService.getProductosPaginado().subscribe( res => {
         if(res['status'] == 'success') {
            this.dato = res["data"]['docs'] as Dato;
         } else {
            this.uiService.popup(res['message'], 'error');
         }
      });
   }

   traerCategorias(){
      this.categoriasService.getCategorias().subscribe( res => {
         if(res['status'] == 'success') {
            this.categorias = res["data"] as Categoria[];
         } else {
            this.uiService.popup(res['message'], 'error');
         }
      });
   }

   alta() {
      // agrega imagen
      if(this.changeImage){
         this.uploader.uploadAll();
         this.uploader.onCompleteItem = ( item: any, response: any, status: any, headers: any) => {
         let json = JSON.parse(response);
         this.myForm.get('imagen').setValue(json["data"]);
         this.guardar();
         };
      }
      // no agrega imagen
      else {
         this.guardar();
      }
   }

   guardar(){
      if(this.myForm.controls["_id"].value){
         // modificacion
         this.productosService.updateProducto(this.myForm.controls["_id"].value, this.myForm.value).subscribe(res => {
            if(res['status'] == 'success') {
               this.setPage(this.dato.page)
               this.uiService.popup(res['message'], 'ok');
            } else {
               this.uiService.popup(res['message'], 'error');
            }
         });
      }
      // alta
      else{
         this.productosService.createProducto(this.myForm.value).subscribe(res => {
            if(res['status'] == 'success') {
               this.resetForm();
               this.uiService.popup(res['message'], 'ok');
            } else {
               this.uiService.popup(res['message'], 'error');
            }
         });
      }
   }

  borrar(id) {
    if(confirm("Estas seguro de querer borrarlo?")){
      this.productosService.deleteProducto(id).subscribe(res => {
         if(res['status'] == 'success') {
            this.resetForm();
            this.uiService.popup(res['message'], 'ok');
         } else {
            this.uiService.popup(res['message'], 'error');
         }
      });
    }
  }



} /*class*/




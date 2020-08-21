import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/models/producto.model';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Categoria } from 'src/app/models/categoria.model';
import { FormBuilder, FormGroup, Form } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})

export class CatalogoComponent implements OnInit {

   productosTecno: Producto[];
   productosElectro: Producto[];
   productosCasa: Producto[];
   productosHerramientas: Producto[];

   categoriasSelect: Categoria[] = [];
   productos: Producto[] = [];
   selectedValue: string = "all";
   titulo: string = "";
   myForm: FormGroup;


   precioMin: number = 0;
   precioMax: number = 0;

   constructor(
      private productosService: ProductosService,
      public categoriasService: CategoriasService,
      private fb: FormBuilder,
   ) {
      this.prepareForm();
      this.traerTodasCategorias();
   }

   ngOnInit(): void {
      this.onChange(this.selectedValue)
   }

   prepareForm() {
      this.myForm = this.fb.group({
        buscador: [''],
        minimo: [''],
        maximo:[''],
        categoria: ['']
      });
    }

   traerTodasCategorias(){
      this.categoriasService.getCategorias().subscribe( res => {
         this.categoriasSelect = res['data'];
      })
   }

   onChange(id: string = 'all') {
      if(id === "all") {
         this.titulo = "Todas"
         this.onChangeForm()

      } else {
         this.categoriasService.getCategoriaById(id).subscribe( res => {
            this.titulo = res['data']['descripcion'];
         })
         this.onChangeForm();

      }
   }

   onChangeForm(){
      this.productosService.getProductosByQuery(this.myForm.value).subscribe( res => {
         this.productos = res['data'] as Producto[];
      })
   }

   resetForm(){
      this.myForm.reset();
      this.onChange();
   }


} // end class

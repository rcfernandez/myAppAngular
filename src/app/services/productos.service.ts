import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {

  selectedProducto: Producto;

   constructor(
      private http: HttpClient
      ) {
      this.selectedProducto = new Producto();
   }

   // GET
   getProductos() {
      return this.http.get(environment.endpoint +'/productos')
   }

   getProductosPaginado(pageInfo=null) {
      let query='';

      if(pageInfo){
         query='?page='+(pageInfo["offset"]+1)
      }
      return this.http.get(environment.endpoint +'/productos/paginado/'+ query);
   }

   getProductosById(id) {
      return this.http.get(environment.endpoint +'/productos/' + id);
   }

   getDestacados() {
      return this.http.get(environment.endpoint +'/productos/destacados');
   }

   getProductosByCategory(id){
      return this.http.get(environment.endpoint +'/productos/categoria/' + id)
   }

   createProducto(datos) {
      return this.http.post(environment.endpoint +'/productos', datos)
   }

   updateProducto(id, datos) {
      return this.http.put(environment.endpoint +'/productos/'+ id, datos);
   }

   deleteProducto(id) {
      return this.http.delete(environment.endpoint +'/productos/'+ id);
   }

   // getProductosByName(name: string) {
   //    return this.http.get(environment.endpoint +'/productos/buscar/'+ name);
   // }

   getProductosByPrice(min?: string, max?: string) {
      return this.http.get(environment.endpoint +'/productos/precio/'+ min + '/' + max);
   }

   getProductosByQuery(objectdata) {
      return this.http.get(environment.endpoint + '/productos/buscar/query', { params : objectdata });
   }



}

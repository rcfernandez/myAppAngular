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
    return this.http.get(environment.urlApi +'/productos');
  }

  getProductosPaginado(pageInfo=null) {
    let query='';

    if(pageInfo){
      query='?page='+(pageInfo["offset"]+1)
    }
    return this.http.get(environment.urlApi +'/productos/paginado/'+ query);
  }

  getProductosById(id) {
    return this.http.get(environment.urlApi +'/productos/' + id);
  }

  getDestacados() {
    return this.http.get(environment.urlApi +'/productos/destacados');
  }

  createProducto(datos) {
    return this.http.post(environment.urlApi +'/productos', datos);
  }

  updateProducto(id, datos) {
    return this.http.put(environment.urlApi +'/productos/'+ id, datos);
  }

  deleteProducto(id) {
    return this.http.delete(environment.urlApi +'/productos/'+ id);
  }

  


}

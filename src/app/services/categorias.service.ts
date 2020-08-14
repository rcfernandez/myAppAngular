import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Categoria } from '../models/categoria.model';


@Injectable({
  providedIn: 'root',
})
export class CategoriasService {

  selectedCategoria: Categoria;

  constructor(
    private http: HttpClient
    ) {
      this.selectedCategoria = new Categoria();
    }


  getCategorias() {
    return this.http.get(environment.endpoint +'/categorias');
  }

  getCategoriasPaginado(pageInfo = null){
    let query='';

    if(pageInfo){
      query='?page='+( pageInfo["offset"]+1 )
    }
    return this.http.get(environment.endpoint +'/categorias/paginado/' + query);
  }

  getCategoriaById(id) {
    return this.http.get(environment.endpoint +'/categorias/'+ id);
  }

  altaCategoria(data) {
    return this.http.post(environment.endpoint +'/categorias/', data);
  }

  modificarCategoria(id, data) {
    return this.http.put(environment.endpoint +'/categorias/'+ id, data);
  }

  borrarCategoria(id) {
    return this.http.delete(environment.endpoint +'/categorias/'+ id);
  }

  altaSubCategoria(idCategoria, data){
    return this.http.put(environment.endpoint +'/categorias/altasubcategoria/' + idCategoria, data);
  }

  modificarSubCategoria(idCategoria, data){
    return this.http.put(environment.endpoint +'/categorias/modificarsubcategoria/' + idCategoria, data);
  }

  borrarSubcategoria(idCategoria: String, data) {
    return this.http.put(environment.endpoint +'/categorias/borrarsubcategoria/'+ idCategoria, data);
  }


}

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
    private http: HttpClient,
    ) {
      this.selectedCategoria = new Categoria();
    }

  // GET CATEGORIAS
  getCategorias() {
    return this.http.get(environment.urlApi +'/categorias'); 
  }

  getCategoriasPaginado(pageInfo = null){
    let query='';

    if(pageInfo){
      query='?page='+( pageInfo["offset"]+1 )
    }
    return this.http.get(environment.urlApi +'/categorias/paginado/' + query); 
  }

  getCategoriaById(id) {
    return this.http.get(environment.urlApi +'/categorias/'+ id);
  }

  altaCategoria(data) {
    return this.http.post(environment.urlApi +'/categorias/', data);
  }

  modificarCategoria(id, data) {
    return this.http.put(environment.urlApi +'/categorias/'+ id, data);
  }

  borrarCategoria(id) {
    return this.http.delete(environment.urlApi +'/categorias/'+ id);
  }
}

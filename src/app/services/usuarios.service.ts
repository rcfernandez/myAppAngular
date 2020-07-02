import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from "../models/usuario.model";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

  selectedUsuario: Usuario;

  constructor(private http: HttpClient) {
    this.selectedUsuario = new Usuario();
  }

  getUsuarios() {
    return this.http.get(environment.urlApi +'/usuarios');
  }

  getUsuariosPaginado(pageInfo = null){
    let query='';

    if(pageInfo){
      query='?page='+( pageInfo["offset"]+1 )
    }
    return this.http.get(environment.urlApi +'/usuarios/paginado/' + query); 
  }

  getUsuarioById(id) {
    return this.http.get(environment.urlApi +'/usuarios/'+ id);
  }

  altaUsuario(data) {
    return this.http.post(environment.urlApi +'/usuarios/', data);
  }

  borrarUsuario(id) {
    return this.http.delete(environment.urlApi +'/usuarios/'+ id);
  }

  modificarUsuario(id, data) {
    return this.http.put(environment.urlApi +'/usuarios/'+ id, data);
  }


}

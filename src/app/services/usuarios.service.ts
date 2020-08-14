import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from "../models/usuario.model";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

  selectedUsuario: Usuario;

  constructor(
    private http: HttpClient
    ) {
    this.selectedUsuario = new Usuario();
  }

  getUsuarios() {
    return this.http.get(environment.endpoint +'/usuarios');
  }

  getUsuariosPaginado(pageInfo = null){
    let query='';

    if(pageInfo){
      query='?page='+( pageInfo["offset"]+1 )
    }
    return this.http.get(environment.endpoint +'/usuarios/paginado/' + query);
  }

  getUsuarioById(id) {
    return this.http.get(environment.endpoint +'/usuarios/'+ id);
  }

  altaUsuario(data) {
    return this.http.post(environment.endpoint +'/usuarios/', data);
  }

  modificarUsuario(id, data) {
    return this.http.put(environment.endpoint +'/usuarios/'+ id, data);
  }

  borrarUsuario(id) {
    return this.http.delete(environment.endpoint +'/usuarios/'+ id);
  }

  // loginUsuario(data) {
  //   return this.http.post(environment.endpoint +'/usuarios/login', data);
  // }


}

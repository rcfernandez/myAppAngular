import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Venta } from '../models/venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  selectedVenta: Venta;

  constructor(
    private http: HttpClient
  ) { 
    this.selectedVenta = new Venta();
  }

  getVentas() {
    return this.http.get(environment.urlApi +'/ventas');
  }

  getVentasPaginado(pageInfo = null) {
    let query='';

    if(pageInfo){
      query='?page='+(pageInfo["offset"]+1)
    }
    return this.http.get(environment.urlApi +'/ventas/paginado/'+ query);
  }

  getVentasById(id) {
    return this.http.get(environment.urlApi +'/ventas/'+ id);
  }

  create(data) {
    return this.http.post(environment.urlApi +'/ventas/', data);
  }

  update(id, data) {
    return this.http.put(environment.urlApi +'/ventas/'+ id, data);
  }

  delete(id) {
    return this.http.delete(environment.urlApi +'/ventas/'+ id);
  }

}
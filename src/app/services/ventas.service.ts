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
      return this.http.get(environment.endpoint +'/ventas');
   }

   getVentasPaginado(pageInfo = null) {
      let query='';

      if(pageInfo){
         query='?page='+(pageInfo["offset"]+1)
      }
      return this.http.get(environment.endpoint +'/ventas/paginado/'+ query);
   }

   getVentasById(id: string) {
      return this.http.get(environment.endpoint +'/ventas/'+ id);
   }

   create(data: any) {
      return this.http.post(environment.endpoint +'/ventas/', data);
   }

   update(id: string, data: any) {
      return this.http.put(environment.endpoint +'/ventas/'+ id, data);
   }

   delete(id: string) {
      return this.http.delete(environment.endpoint +'/ventas/'+ id);
   }

   getVentasPorUsuario(id: string, page: any) {
      let query = `?page=${page['pageIndex']+1}&limit=${page['pageSize']}`;

      return this.http.get(environment.endpoint +'/ventas/usuario/' + id + query);
   }


}

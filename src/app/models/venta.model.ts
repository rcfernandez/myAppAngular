import { Imagen } from "./imagen.model";

// usuario
export interface UsuarioVenta {
   _id: string,
   usuario: string,
   nombre: string,
   apellido: string,
   email: string,
   telefono: string,
   imagen: Imagen
}

// productos
export interface ProductoVenta {
   _id: string,
   nombre: string,
   descripcion: string,
   precio: number,
   categoria: string,
   imagen: Imagen
}

// VENTA
export class Venta {
   _id: string;
   fecha: Date;
   usuario: UsuarioVenta;
   producto: ProductoVenta;
   cantidad: number;
   total: number;
   medio: number;
   estado: number;

   constructor(
      _id = '',
      fecha = null,
      usuario = null,
      producto = null,
      cantidad = 0,
      total = 0,
      medio = 0,
      estado = 0,

   ) {
      this._id = _id;
      this.fecha = fecha;
      this.usuario = usuario;
      this.producto = producto;
      this.cantidad = cantidad;
      this.total = total;
      this.medio = medio;
      this.estado = estado;
   }
}

// export interface Imagen {
//   fieldname: string,
//   originalname: string,
//   encoding: string,
//   mimetype: string,
//   destination: string,
//   filename: string,
//   path: string,
//   size: string,
// }

export class Producto {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  categoria: any;
  destacado: number;
  imagen: any

  constructor(
    id = '',
    nombre = '',
    descripcion = '',
    precio = 0,
    cantidad = 0,
    categoria = {},
    destacado = 0,
    imagen = {}
  ) {
    this._id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.cantidad = cantidad;
    this.categoria = categoria;
    this.destacado = destacado;
    this.imagen = imagen;
  }
}

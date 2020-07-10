import { Imagen } from './imagen.model';

export class Producto {
  _id: string;
  nombre: string;
  descripcion: string;
  sku: string;
  precio: number;
  oferta: number;
  cantidad: number;
  categoria: any;
  destacado: number;
  imagen: Imagen

  constructor(
    id = '',
    nombre = '',
    descripcion = '',
    sku = '',
    precio = 0,
    oferta = 0,
    cantidad = 0,
    categoria = {},
    destacado = 0,
    imagen = null
  ) {
    this._id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.sku = sku;
    this.precio = precio;
    this.oferta = oferta;
    this.cantidad = cantidad;
    this.categoria = categoria;
    this.destacado = destacado;
    this.imagen = imagen;
  }
}

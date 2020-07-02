export class Venta {
  _id: string;
  fecha: Date;
  usuario: any;
  productos: any;
  total: number;
  estado: boolean;

  constructor(
    _id = '',
    fecha = null,
    usuario = '',
    productos = '',
    total = 0,
    estado = false
  ) {
    this._id = _id;
    this.fecha = fecha;
    this.usuario = usuario;
    this.productos = productos;
    this.total = total;
    this.estado = estado;
  }
}

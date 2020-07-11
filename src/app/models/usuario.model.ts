import { Imagen } from './imagen.model';

export class Usuario {
  _id: string;
  usuario: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  password: string;
  imagen: Imagen;
  rol: number;

  constructor(
    id = '',
    usuario = '',
    nombre = '',
    apellido = '',
    telefono = '',
    email = '',
    password = '',
    imagen = null,
    rol = 0
  ) {
    this._id = id;
    this.usuario = usuario;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.email = email;
    this.password = password;
    this.imagen = imagen,
    this.rol = rol
  }
}

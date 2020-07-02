export class Usuario {
  _id: string;
  usuario: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  password: string;

  constructor(
    id = '',
    usuario = '',
    nombre = '',
    apellido = '',
    telefono = '',
    email = '',
    password = '',
  ) {
    this._id = id;
    this.usuario = usuario;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.email = email;
    this.password = password;
  }
}

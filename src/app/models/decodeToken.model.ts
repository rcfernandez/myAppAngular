import { Usuario } from './usuario.model';

export interface DecodeToken {
    usuario: Usuario,
    exp: number,
    iat: number,
    jti: string
  }

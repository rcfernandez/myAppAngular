import { Imagen } from './imagen.model';

export interface Subcategoria {
    _id: string,
    descripcion: string,
    imagen: Imagen
}

export class Categoria {
    _id: string;
    descripcion: string;
    subcategorias: Subcategoria[];
    imagen: Imagen;

    constructor(
            id = "",
            descripcion = "",
            subcategorias = [],
            imagen = null
        ) {

        this._id = id;
        this.descripcion = descripcion;
        this.subcategorias = subcategorias;
        this.imagen = imagen
    }
}
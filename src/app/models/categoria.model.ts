export interface Subcategoria {
    _id: string,
    descripcion: string,
}

export class Categoria {
    _id: string;
    descripcion: string;
    subcategorias: Subcategoria[];

    constructor(id = "", descripcion = "", subcategorias = []) {
        this._id = id;
        this.descripcion = descripcion;
        this.subcategorias = subcategorias;
    }
}
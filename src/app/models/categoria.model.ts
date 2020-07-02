export class Categoria {
    _id: string;
    descripcion: string;

    constructor(id="", descripcion="") {
        this._id = id;
        this.descripcion = descripcion;
    }
}
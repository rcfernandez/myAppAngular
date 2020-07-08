import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Categoria } from '../../models/categoria.model';
import { Dato } from 'src/app/models/dato.model';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface Subcategoria {
  _id: String,
  descripcion: String
}

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})

export class CategoriasComponent implements OnInit {

  myForm: FormGroup;
  dato: Dato;
  columns = [];
  categorias: Categoria[];

  //categoriaSelected = null


  constructor(
    public categoriasService: CategoriasService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.prepareForm();
    this.prepareColumns();
  }

  ngOnInit(): void {
    this.traerCategoriasPaginado();
    this.setPage({ offset: 0 });
  }

  prepareForm() {
    this.myForm = this.fb.group({
      _id: [''],
      descripcion: ['', Validators.required],
      subcategorias: ['']
    });
  }

  prepareColumns() {
    this.columns = [
      { name: 'ID', prop: '_id' },
      { name: 'Descripcion', prop: 'descripcion' },
      { name: 'Subcategorias', prop: 'subcategorias' },
    ]
  }

  traerCategorias() {
    this.categoriasService.getCategorias().subscribe((data) => {
      this.dato = data as Dato;
      console.log("traerCategorias: " + this.dato)
    });
  }

  traerCategoriasPaginado() {
    this.categoriasService.getCategoriasPaginado().subscribe((data) => {
      this.dato = data as Dato;
      console.log("traerCategoriasPaginado: " + this.dato)
    });
  }

  altaCategoria() {
    if (this.myForm.controls["_id"].value) {
      // se modifica
      this.categoriasService.modificarCategoria(this.myForm.controls["_id"].value, this.myForm.value).subscribe((data) => {
        this.resetForm();
        this.openSnackBar("Se ha modificado correctamente");
      });
    }
    // sino agrega uno nuevo
    else {
      this.categoriasService.altaCategoria(this.myForm.value).subscribe((data) => {
        this.resetForm();
        this.openSnackBar("Se ha agregado correctamente");
      });

    }
  }

  modificar(event) {
    if (event.type == 'click') {
      let categoria: Categoria = event.row
      this.categoriasService.selectedCategoria = categoria;
      
      this.myForm = this.fb.group({
        _id: [categoria._id],
        descripcion: [categoria.descripcion, Validators.required],
      });
    }
  }

  modificarSub(event) {
    if (event.type == 'click') {
      let categoria: Categoria = event.row
      this.categoriasService.selectedCategoria = categoria;
      let subcategoria = categoria.subcategorias;
    }
  }

  borrar(id) {
    if (confirm("Estas seguro de querer borrarlo?")) {
      this.categoriasService.borrarCategoria(id).subscribe(() => {
        this.traerCategoriasPaginado();
        this.openSnackBar("Se ha borrado correctamente");
      });
    }
  }

  resetForm() {
    this.myForm.reset();
    this.prepareForm();
    this.traerCategoriasPaginado();
  }

  setPage(pageInfo) {
    this.categoriasService.getCategoriasPaginado(pageInfo).subscribe((data) => {

      //Registros de productos (Informacion)
      this.categorias = data['docs'] as Categoria[];
      this.dato = data as Dato;

      //La pagina que estoy consultando
      this.dato.page = pageInfo["offset"];
    })
  }

  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, "", {
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }

  

} /*clase categorias*/

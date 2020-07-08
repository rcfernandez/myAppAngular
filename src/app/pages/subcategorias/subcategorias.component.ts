import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Categoria } from 'src/app/models/categoria.model';

export interface Subcategoria {
  _id: String,
  descripcion: String
}

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrls: ['./subcategorias.component.scss']
})

export class SubcategoriasComponent implements OnInit {

  myForm: FormGroup;
  categorias: Categoria[];
  subcategorias: Subcategoria[];
  cantidadSubcategorias: number;
  columns = [];

  idCategoriaSeleccionada: String = "";
  subcategoriaSeleccionada: Subcategoria;

  constructor(
    public categoriasService: CategoriasService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.prepareForm();
    this.prepareColumns();
  }

  ngOnInit(): void {
    this.traerCategorias()
  }

  prepareForm() {
    this.myForm = this.fb.group({
      _id: [''],
      descripcion: [''],
    });
  }

  prepareColumns() {
    this.columns = [
      { name: '_id', prop: '_id' },
      { name: 'descripcion', prop: 'descripcion' },
    ]
  }

  traerCategorias() {
    this.categoriasService.getCategorias().subscribe((data) => {
      this.categorias = data as Categoria[];
      console.log("traerAllCategorias: ", data)
    });
  }

  traerSubcategorias(idCategoria) {
    this.categoriasService.getCategoriaById(idCategoria).subscribe(data => {
      this.subcategorias = data["subcategorias"];
      console.log("subcategorias: ", this.subcategorias)
    });
  }

  capturaEvento(event) {
    this.idCategoriaSeleccionada = event.target.value
    this.traerSubcategorias(this.idCategoriaSeleccionada)
    console.log("event.target.value: ", event.target.value);
  }

  altaSubCategoria() {

    if (this.myForm.controls["_id"].value) {
      // se modifica
      this.categoriasService.modificarSubCategoria(this.idCategoriaSeleccionada, this.myForm.value).subscribe((data) => {
        this.openSnackBar("Se ha modificado correctamente");
      });
      this.resetForm();
    }
    // sino agrega uno nuevo
    else {
      this.categoriasService.altaSubCategoria(this.idCategoriaSeleccionada, this.myForm.value).subscribe((data) => {
        this.openSnackBar("Se ha agregado correctamente");
      });
      this.resetForm();

    }
  }

  borrar(row: Subcategoria) {   

    console.log('this.idCategoriaSeleccionada: ', this.idCategoriaSeleccionada);
    console.log('row: ', row);
    
    if (confirm("Estas seguro de querer borrarlo?")) {

      this.categoriasService.borrarSubcategoria(this.idCategoriaSeleccionada, row).subscribe((data) => {
        //this.traerCategorias();
        console.log("data: ", data)
      });
      this.resetForm();
      this.openSnackBar("Se ha borrado correctamente");      
    }

  }


  modificar(event) {
    if (event.type == 'click') {
      this.subcategoriaSeleccionada = event.row
      //this.categoriasService.selectedCategoria = categoria;
      console.log("this.subcategoriaSeleccionada: ", this.subcategoriaSeleccionada);

      this.myForm = this.fb.group({
        _id: this.subcategoriaSeleccionada._id,
        descripcion: this.subcategoriaSeleccionada.descripcion,
      });
    }
  }

  resetForm() {
    //this.myForm.reset();
    console.log("this.idCategoriaSeleccionada", this.idCategoriaSeleccionada);

    this.prepareForm();
    //this.traerCategorias();
    this.traerSubcategorias(this.idCategoriaSeleccionada);
  }

  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, "", {
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }




} /*CLASE SUBCATEGORIA*/

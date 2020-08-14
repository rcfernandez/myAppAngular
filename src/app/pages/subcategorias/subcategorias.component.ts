import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Categoria } from 'src/app/models/categoria.model';
import { invalid } from '@angular/compiler/src/render3/view/util';


const pathFolder = './public/images/categorias/'
const UrlUpload = `http://localhost:3000/upload?path=${pathFolder}`
const pathImage = "http://localhost:3000/images/categorias/"


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

  titulo = "Subcategorias"
  subtitulo = "Hola aca podrás agregar subcategorias a las categorias!"
  myForm: FormGroup;
  // dato: Dato;
  columns=[];
  configSnackBar = { duration: 2000, x: "right" as any, y: "top" as any };

  imagenSeleccionada = "placeholder-image.png"
  pathImage = pathImage;



  // myForm: FormGroup;
  categorias: Categoria[];
  subcategorias: Subcategoria[];
  cantSubcategorias: number;
  // columns = [];

  idCategoriaSeleccionada: String;
  subcategoriaSeleccionada: Subcategoria;

  constructor(
    public categoriasService: CategoriasService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.prepareForm();
    this.prepareColumns();
    this.traerCategorias()
  }

  ngOnInit(): void {

  }

  prepareForm() {
    this.myForm = this.fb.group({
      _id: [''],
      descripcion: ['', Validators.required],
    });
  }

  prepareColumns() {
    this.columns = [
      // { name: '_id', prop: '_id' },
      { name: 'Descripcion', prop: 'descripcion' },
    ]
  }

  onActivate(event) { 
    if(event.type == 'click') {
      this.cargarForm(event.row);
      // this.changeImage = false;
    }
  }

  cargarForm(subcategoria: Subcategoria) {
    this.myForm = this.fb.group({
      _id: [subcategoria._id],
      descripcion: [subcategoria.descripcion, Validators.required],
      // subcategoria: [subcategoria.subcategorias],
      // imagen: [categoria.imagen],
    });
    // this.imagenSeleccionada = categoria.imagen.filename;
  }

  resetForm() {
    this.myForm.reset();
    if(this.idCategoriaSeleccionada){
      this.traerSubcategorias(this.idCategoriaSeleccionada);
      this.categoriasService.getCategoriaById(this.idCategoriaSeleccionada).subscribe( (res) => {
        this.imagenSeleccionada = res["data"]["imagen"].filename;
      })
    }
    // else{
    //   this.imagenSeleccionada = 'placeholder-image.png';
    // }
   // this.traerCategorias();
  }

  openSnackBar(mensaje:string) {
    this._snackBar.open(mensaje,"", {
      duration: this.configSnackBar.duration,
      horizontalPosition: this.configSnackBar.x,
      verticalPosition: this.configSnackBar.y
    });
  }

  traerCategorias() {
    this.categoriasService.getCategorias().subscribe(res => {
      this.categorias = res["data"] as Categoria[];
    });
  }

  traerSubcategorias(idCategoria) {
    this.categoriasService.getCategoriaById(idCategoria).subscribe(res => {
      this.subcategorias = res["data"]["subcategorias"] as Subcategoria[];
      this.cantSubcategorias = this.subcategorias.length;
    });
    this.idCategoriaSeleccionada = idCategoria;
  }

  onChange(id) {
    this.idCategoriaSeleccionada = id
    this.categoriasService.getCategoriaById(id).subscribe( (res) => {
      this.imagenSeleccionada = res["data"]["imagen"].filename;
    })
    this.traerSubcategorias(this.idCategoriaSeleccionada)
  }

  alta() {

    if (this.myForm.controls["_id"].value) {
      // se modifica
      this.categoriasService.modificarSubCategoria(this.idCategoriaSeleccionada, this.myForm.value).subscribe((data) => {
        this.resetForm();
      });
      this.openSnackBar("Se ha modificado correctamente");
    }
    // sino agrega uno nuevo
    else {
      this.categoriasService.altaSubCategoria(this.idCategoriaSeleccionada, this.myForm.value).subscribe((data) => {
        this.resetForm();
        this.openSnackBar("Se ha agregado correctamente");
      });
    }
  }

  borrar(row: Subcategoria) {       
    if (confirm("Estas seguro de querer borrarlo?")) {
      this.categoriasService.borrarSubcategoria(this.idCategoriaSeleccionada, row).subscribe(() => {
        this.resetForm();
        this.openSnackBar("Se ha borrado correctamente");      
      });
    }
  }


} /*CLASE SUBCATEGORIA*/

import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Categoria } from '../../models/categoria.model';
import { Dato } from 'src/app/models/dato.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})

export class CategoriasComponent implements OnInit {
  categorias: Categoria[];
  myForm: FormGroup;

  dato: Dato;
  columns=[];

  constructor(
    public categoriasService: CategoriasService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.prepareForm();
    this.prepareColumns();
  }

  ngOnInit(): void {
    this.traerCategorias();
    this.setPage({ offset: 0 });
  }

  prepareForm(){
    this.myForm = this.fb.group({
      _id: [''],
      descripcion: ['', Validators.required],
    });
  }

  prepareColumns(){
    this.columns=[
      { name:'Descripcion',prop:'descripcion' },
    ]
  }

  traerCategorias() {
    this.categoriasService.getCategoriasPaginado().subscribe((data) => {
      this.dato = data as Dato;
      this.categorias = this.dato.docs;
      console.log("traerCategorias: " + this.categorias)
    });
  }

  alta() {
    if(this.myForm.controls["_id"].value){
      // se modifica
      this.categoriasService.modificarCategoria(this.myForm.controls["_id"].value, this.myForm.value).subscribe((data) => {
        this.resetForm();
        this.openSnackBar("Se ha modificado correctamente");
      });
    }
    // sino agrega uno nuevo
    else{
      this.categoriasService.altaCategoria(this.myForm.value).subscribe((data) => {
        this.resetForm();
        this.openSnackBar("Se ha modificado correctamente");
      });
      
    }
  }

  modificar(event) {
    if(event.type == 'click') {
      let categoria: Categoria = event.row
      this.categoriasService.selectedCategoria = categoria;
      this.myForm = this.fb.group({
        _id: [categoria._id],
        descripcion: [categoria.descripcion, Validators.required],
      });
    }

  }

  borrar(id) {
     if(confirm("Estas seguro de querer borrarlo?")){
       this.categoriasService.borrarCategoria(id).subscribe(() => {
         this.traerCategorias();
         this.openSnackBar("Se ha borrado correctamente");
       });
     }
  }

  resetForm() {
    this.myForm.reset();
    this.prepareForm();
    this.traerCategorias();
  }

  setPage(pageInfo){
    this.categoriasService.getCategoriasPaginado(pageInfo).subscribe( (data) =>{
      
      //Registros de productos (Informacion)
      this.categorias= data['docs'] as Categoria[];
      this.dato = data as Dato;

      //La pagina que estoy consultando
      this.dato.page = pageInfo["offset"];
    })
  }

  openSnackBar(mensaje:string) {
    this._snackBar.open(mensaje,"", {
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }


} /*clase categorias*/

import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Categoria } from '../../models/categoria.model';
import { Dato } from 'src/app/models/dato.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

const pathFolder = './public/images/categorias/'
const UrlUpload = `${environment.endpoint}/upload?path=${pathFolder}`
const pathImage = `${environment.endpoint}/images/categorias/`

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

  titulo = "Categorias"
  subtitulo = "Aqui puede configurar las categorias de los productos"
  myForm: FormGroup;
  dato: Dato;
  columns=[];
  configSnackBar = { duration: 2000, x: "right" as any, y: "top" as any };

  public uploader: FileUploader = new FileUploader({ url: UrlUpload, itemAlias: "photo" });
  pathImage = pathImage;
  imagenSeleccionada = "placeholder-image.png"
  changeImage: Boolean = false;

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
      imagen:[''],
      subcategorias: ['']
    });
  }

  prepareColumns() {
    this.columns = [
      { name: 'Descripcion', prop: 'descripcion' },
      // { name: 'Subcategorias', prop: "subcategorias" },
    ]
  }

  onChange(event){
    if(event.type == 'change'){
      this.changeImage = true;
    }
  }

  onActivate(event) {
    if(event.type == 'click') {
      this.cargarForm(event.row);
      this.changeImage = false;
    }
  }

  cargarForm(categoria: Categoria) {
    this.myForm = this.fb.group({
      _id: [categoria._id],
      descripcion: [categoria.descripcion, Validators.required],
      subcategoria: [categoria.subcategorias],
      imagen: [categoria.imagen],
    });
    this.imagenSeleccionada = categoria.imagen.filename;
  }

  resetForm() {
    this.myForm.reset();
    this.imagenSeleccionada = 'placeholder-image.png';
    this.changeImage = false;
    this.traerCategoriasPaginado();
  }

  setPage(pageInfo){
    this.categoriasService.getCategoriasPaginado(pageInfo).subscribe( res =>{
      this.dato = res["data"] as Dato;
      this.dato.page = pageInfo["offset"];
    })
  }

  openSnackBar(mensaje:string) {
    this._snackBar.open(mensaje,"", {
      duration: this.configSnackBar.duration,
      horizontalPosition: this.configSnackBar.x,
      verticalPosition: this.configSnackBar.y
    });
  }

  traerCategoriasPaginado() {
    this.categoriasService.getCategoriasPaginado().subscribe((res) => {
      this.dato = res["data"] as Dato;
    });
  }

  alta() {
    // agrega imagen
    if(this.changeImage){

      this.uploader.uploadAll();
      this.uploader.onCompleteItem = ( item: any, response: any, status: any, headers: any) => {
        let json = JSON.parse(response);
        this.myForm.get('imagen').setValue(json["data"]);
        this.guardar();
        console.log(`ALTA: ${this.myForm.value}`);

      };
    }
    // no agrega imagen
    else {
      this.guardar();
      console.log(`paso sin guardar imagen`);
    }
  }

  guardar(){
    if(this.myForm.controls["_id"].value){
      // modificacion
      this.categoriasService.modificarCategoria(this.myForm.controls["_id"].value, this.myForm.value).subscribe(() => {
        this.resetForm();
        this.openSnackBar("Se ha modificado correctamente");
      });
    }
    // alta
    else{
      let data = this.categoriasService.altaCategoria(this.myForm.value).subscribe(() => {
        this.resetForm();
        this.openSnackBar("Se ha generado correctamente");
      });
    }
  }

  borrar(id) {
    if(confirm("Estas seguro de querer borrarlo?")){
      this.categoriasService.borrarCategoria(id).subscribe(() => {
        this.resetForm();
        this.openSnackBar("Se ha borrado correctamente");
      });
    }
  }



} /*clase categorias*/

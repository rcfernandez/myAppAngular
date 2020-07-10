import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CategoriasService } from '../../services/categorias.service';
import { Producto } from '../../models/producto.model';
import { Categoria } from 'src/app/models/categoria.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dato } from 'src/app/models/dato.model';
import { FileUploader } from 'ng2-file-upload';

const URL = "http://localhost:3000/productos/upload"

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})

export class ProductosComponent implements OnInit {

  titulo = "Productos"
  subtitulo = "Aca pueden cargar los datos de los productos"
  myForm: FormGroup;
  dato: Dato;
  columns=[];
  configSnackBar = {
    duration: 2000,
    x: "right" as any,
    y: "top" as any
  }
  
  //Instanciar uploader
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: "photo" });
  pathImage = "http://localhost:3000/images/productos/"
  imagenSeleccionada = "placeholder-image.png"
  changeImage: Boolean = false;
  
  productos: Producto[];
  categorias: Categoria[];
  
  constructor(
    public productosService: ProductosService,
    public categoriasService: CategoriasService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
    ) {
      this.prepareForm();
      this.prepareColumns()
      this.traerCategorias();      
    }

  ngOnInit(): void {
    this.traerProductosPaginado();    
    this.setPage({ offset: 0 }); //SetPage en base a una pagina consulta productos a express
  }

  prepareForm(){
    this.myForm = this.fb.group({
      _id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      sku: ['', Validators.required],
      precio: [''],
      oferta: [''],
      cantidad: [''],
      categoria: [''],
      destacado: [''],
      imagen:[''],
    });
  }

  prepareColumns(){
    this.columns=[
      { name:'Nombre', prop:'nombre' },
      { name:'Descripcion',prop:'descripcion' },
      { name:'SKU',prop:'sku' },
      { name:'Precio', prop:'precio' }, 
      { name:'Oferta', prop:'oferta' }, 
      { name:'Cantidad',prop:'cantidad' }, 
      { name:'Categoria',prop:'categoria.descripcion' },
      { name:'Destacado',prop:'destacado' }, 
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

  cargarForm(producto: Producto) {
    this.myForm = this.fb.group({
      _id: [producto._id],
      nombre: [producto.nombre, Validators.required],
      descripcion: [producto.descripcion, Validators.required],
      sku: [producto.sku, Validators.required],
      precio: [producto.precio],
      oferta: [producto.oferta],
      cantidad: [producto.cantidad],
      categoria: [producto.categoria._id],
      destacado: [producto.destacado],
      imagen: [producto.imagen],
    });
    this.imagenSeleccionada = producto.imagen.filename;
  }

  resetForm() {
    this.myForm.reset();
    this.imagenSeleccionada = 'placeholder-image.png';
    this.changeImage = false;
    this.traerProductosPaginado();
  }

  setPage(pageInfo){
    this.productosService.getProductosPaginado(pageInfo).subscribe( data =>{
      this.dato = data as Dato;
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

  traerProductosPaginado() {
    this.productosService.getProductosPaginado().subscribe((data) => {
      this.dato = data as Dato;
    });
  }

  traerCategorias(){
    this.categoriasService.getCategorias().subscribe((data) => {
      this.categorias = data as Categoria[];
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
      this.productosService.updateProducto(this.myForm.controls["_id"].value, this.myForm.value).subscribe(() => {
      });
      this.resetForm();
      this.openSnackBar("Se ha modificado correctamente");
    }
    // alta
    else{
      this.productosService.createProducto(this.myForm.value).subscribe(() => {} );
      this.resetForm();
      this.openSnackBar("Se ha generado correctamente");
    }
  }

  borrar(id) {
    if(confirm("Estas seguro de querer borrarlo?")){
      this.productosService.deleteProducto(id).subscribe(() => {
        this.resetForm();
        this.openSnackBar("Se ha borrado correctamente");
      });
    }
  }



} /*class*/




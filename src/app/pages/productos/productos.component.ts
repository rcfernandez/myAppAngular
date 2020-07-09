import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CategoriasService } from '../../services/categorias.service';
import { Producto, Imagen } from '../../models/producto.model';
import { Categoria } from 'src/app/models/categoria.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dato } from 'src/app/models/dato.model';
import { FileUploader } from 'ng2-file-upload';


//define the constant url we would be uploading to.
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
  productos: Producto[];
  categorias: Categoria[];
  
  dato: Dato;
  columns=[];

  configSnackBar = {
    duration: 2000,
    x: "right" as any,
    y: "top" as any
  }
  
  //Instanciar uploader
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: "photo" });
  //imagen:Array<any>=[];
  imagenSeleccionada = "placeholder-image.png"
  changeImage: Boolean = false;
  pathImage = "http://localhost:3000/images/productos/"


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
    this.traerProductos();    
    this.setPage({ offset: 0 }); //SetPage en base a una pagina consulta productos a express
  }

  prepareForm(){
    this.myForm = this.fb.group({
      _id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [''],
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
      { name:'Precio', prop:'precio' }, 
      { name:'Cantidad',prop:'cantidad' }, 
      { name:'Categoria',prop:'categoria.descripcion' },
      { name:'Destacado',prop:'destacado' }, 
    ]
  }

  traerProductos() {
    this.productosService.getProductosPaginado().subscribe((data) => {
      this.dato = data as Dato;
    });
  }

  onChange(event){

    if(event.type == 'change'){
      this.changeImage = true;
    }

  }

  alta() {

    if(this.changeImage){
      
      this.uploader.uploadAll();
  
      this.uploader.onCompleteItem = ( item: any, response: any, status: any, headers: any) => {
        
        console.log("Imagen subida, item: ", item ,"status: ", status, "response: ", response);
        let json = JSON.parse(response);
        console.log("json data: ", json["data"]);
        this.myForm.get('imagen').setValue(json["data"]);
        
        this.guardar();
      };
    }
    else {
      this.guardar();
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
      this.productosService.createProducto(this.myForm.value).subscribe(() => {
      });
      this.resetForm();
      this.openSnackBar("Se ha generado correctamente");
    }

  }


  cargarForm(producto: Producto) {
    //this.productosService.selectedProducto = producto;
    this.myForm = this.fb.group({
      _id: [producto._id],
      nombre: [producto.nombre, Validators.required],
      descripcion: [producto.descripcion, Validators.required],
      precio: [producto.precio],
      cantidad: [producto.cantidad],
      categoria: [producto.categoria._id],
      destacado: [producto.destacado],
      imagen: [producto.imagen],
    });
    this.imagenSeleccionada = producto.imagen.filename;
  }

  onActivate(event) {
    if(event.type == 'click') {
      this.cargarForm(event.row);
      console.log(event.row);
      this.changeImage = false;
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

  resetForm() {
    this.imagenSeleccionada = 'placeholder-image.png';
    this.changeImage = false;
    this.myForm.reset();
    this.traerProductos();
  }

  traerCategorias(){
    this.categoriasService.getCategorias().subscribe((data) => {
      this.categorias = data as Categoria[];
    });
  }

  setPage(pageInfo){
    this.productosService.getProductosPaginado(pageInfo).subscribe( (data) =>{
      
      //this.productos= data['docs'] as Producto[];
      this.dato = data as Dato;

      //La pagina que estoy consultando
      this.dato.page = pageInfo["offset"];
      console.log("pageInfo: ", pageInfo);
    })
  }

  openSnackBar(mensaje:string) {
    this._snackBar.open(mensaje,"", {
      duration: this.configSnackBar.duration,
      horizontalPosition: this.configSnackBar.x,
      verticalPosition: this.configSnackBar.y
    });
  }


} /*class*/




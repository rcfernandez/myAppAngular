import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../../services/categorias.service';
import { Producto } from '../../models/producto.model';
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
  
  //Instanciar variabled uploader
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: "photo"
  });

  productos: Producto[];
  categorias: Categoria[];
  myForm: FormGroup;

  
  imagen:Array<any>=[];

  dato: Dato;
  columns=[];

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

  uploadImage(){

       //sube la imagen
       this.uploader.uploadAll();

    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = ( item: any, response: any, status: any, headers: any) => {
      
      console.log("Imagen subida item, status, response: ", item, status, response);
      let json = JSON.parse(response);
      console.log("json data: ", json["data"])
      this.myForm.get('imagen').setValue(json["data"])
    };
  }

  prepareForm(){
    this.myForm = this.fb.group({
      _id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0],
      cantidad: [0],
      categoria: [''],
      destacado: [0],
      imagen:['']
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
      { name:'Imagen', prop: 'imagen.path'},
    ]
  }

  traerProductos() {
    this.productosService.getProductosPaginado().subscribe((data) => {
      this.dato = data as Dato;
    });
  }

  alta() {

    this.uploadImage();
  
    if(this.myForm.controls["_id"].value){
      // modificacion
      this.productosService.updateProducto(this.myForm.controls["_id"].value, this.myForm.value).subscribe((data) => {
      });
      this.openSnackBar("Se ha modificado correctamente");
      //this.resetForm();
    }
    // alta
    else{
      console.log("this.myForm.value: ", this.myForm.value);
      this.productosService.createProducto(this.myForm.value).subscribe((data) => {
        console.log("Respuesta de CreateProducto: ", data);
      });
     // this.resetForm();
      this.openSnackBar("Se ha generado correctamente");
    }
  }

  modificar(producto: Producto) {
    this.productosService.selectedProducto = producto;
    this.myForm = this.fb.group({
      _id: [producto._id],
      nombre: [producto.nombre, Validators.required],
      descripcion: [producto.descripcion, Validators.required],
      precio: [producto.precio, Validators.required],
      cantidad: [producto.cantidad],
      categoria: [producto.categoria._id],
      destacado: [producto.destacado],
      imagen: [producto.imagen],
    });
  }

  modificar2(event) {
    if(event.type == 'click') {
      this.modificar(event.row);
      console.log(event.row);
    }
  }

  borrar(id) {
    if(confirm("Estas seguro de querer borrarlo?")){
      this.productosService.deleteProducto(id).subscribe(() => {
        this.traerProductos();
        this.openSnackBar("Se ha borrado correctamente");
      });
    }
  }

  resetForm() {
    //this.claseLabel=""; // quita la clase="active" de los labels
    this.myForm.reset();
   // this.prepareForm();
    this.traerProductos();
  }

  traerCategorias(){
    this.categoriasService.getCategorias().subscribe((data) => {
      this.categorias = data as Categoria[];
    });
  }

  setPage(pageInfo){
    this.productosService.getProductosPaginado(pageInfo).subscribe( (data) =>{
      
      //Registros de productos (Informacion)
      this.productos= data['docs'] as Producto[];
      this.dato = data as Dato;

      //La pagina que estoy consultando
      this.dato.page = pageInfo["offset"];
      console.log("pageInfo: ", pageInfo);
    })
  }

  openSnackBar(mensaje:string) {
    this._snackBar.open(mensaje,"", {
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition: "bottom"
    });
  }

 


} /*class*/




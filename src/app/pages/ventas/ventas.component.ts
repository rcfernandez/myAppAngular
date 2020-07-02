import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { VentasService } from 'src/app/services/ventas.service';
import { Venta } from 'src/app/models/venta.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Producto } from 'src/app/models/producto.model';
import { Dato } from 'src/app/models/dato.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
})
export class VentasComponent implements OnInit {
  ventas: Venta[];
  productos: Producto[];
  usuarios: Usuario[];
  myForm: FormGroup;

  dato: Dato;
  columns=[];

  constructor(
    public ventasService: VentasService,
    public productosService: ProductosService,
    public usuariosService: UsuariosService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {

    this.prepareForm();
    this.prepareColumns();
    this.traerProductos();
    this.traerUsuarios();   
    
  }

  ngOnInit(): void {
    this.traerVentas();
    this.setPage({ offset: 0 });
  }

  prepareForm(){
    this.myForm = this.fb.group({
      _id: [''],
      fecha: [Date.now(), Validators.required],
      usuario: ['', Validators.required],
      productos: ['', Validators.required],
      total: [0, Validators.required],
      estado: [0]
    });
  }

  prepareColumns(){
    this.columns=[
      { name:'fecha', prop:'fecha' },
      { name:'usuario',prop:'usuario.usuario' },
      { name:'productos', prop:'productos.nombre' }, 
      { name:'total',prop:'total' }, 
      { name:'estado',prop:'estado' }
    ]
  }

  traerVentas() {
    this.ventasService.getVentasPaginado().subscribe((data) => {
      this.dato = data as Dato;      
      this.ventas = this.dato.docs;
    });
  }

  traerUsuarios() {
    this.usuariosService.getUsuarios().subscribe((data) => {
      this.usuarios = data as Usuario[];
    });
  }

  traerProductos() {
    this.productosService.getProductos().subscribe((data) => {
      this.productos = data as Producto[];
    });
  }

  alta() {
    if (this.myForm.controls['_id'].value) {
      // se modifica
      this.ventasService.update(this.myForm.controls['_id'].value, this.myForm.value).subscribe((data) => {
        this.resetForm();
        this.openSnackBar("Se ha modificado correctamente");
      });
    }
    // sino agrega uno nuevo
    else {
      this.ventasService.create(this.myForm.value).subscribe((data) => {
        this.resetForm();
        this.openSnackBar("Se ha generado correctamente");
      });
    }
  }

  modificar(event) {
    if(event.type == 'click'){
      let venta: Venta = event.row;
      this.ventasService.selectedVenta = venta;
      this.myForm = this.fb.group({
        _id: [venta._id],
        fecha: [venta.fecha],
        usuario: [venta.usuario._id],
        productos: [venta.productos._id],
        total: [venta.total],
        estado: [venta.estado],
      });    
    }

  }

  borrar(id) {
    if (confirm('Estas seguro de querer borrarlo?')) {
      this.ventasService.delete(id).subscribe(() => {
        this.traerUsuarios();
        this.openSnackBar("Se ha borrado correctamente");
      });
    }
  }

  resetForm() {
    this.myForm.reset();
    this.prepareForm();
    this.traerVentas();
  }

  setPage(pageInfo){
    this.ventasService.getVentasPaginado(pageInfo).subscribe( (data) =>{
      //Registros de productos (Informacion)
      this.dato = data as Dato;
      this.ventas= this.dato.docs;

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


}/*clase ventas*/

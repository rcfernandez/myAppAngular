import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/models/producto.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogElementComponent } from 'src/app/components/dialog-element/dialog-element.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  productos: Producto[];

  titulo = "Destacados";
  subtitulo = "Aqui puede ver los productos destacados";
  pathImage = "http://localhost:3000/images/productos/";

  constructor(
    private productosService: ProductosService,
    public dialog: MatDialog
    ) {
    
  }

  ngOnInit(): void {
    this.getProductosDestacados();
  }

  getProductosDestacados(){
    this.productosService.getDestacados().subscribe((data) => {
      this.productos = data as Producto[];
    });
  }

  openDialog(producto: Producto) {  

    const dialogRef = this.dialog.open(DialogElementComponent, {
      // width: '330px',
      // height: '400px',
      data: producto
    });

    dialogRef.afterClosed().subscribe(result => {
     //console.log(`Dialog result: ${result}`);
    });
  }


}

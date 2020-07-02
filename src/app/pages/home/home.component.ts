import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/models/producto.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  productos: Producto[];

  constructor(
    private productosService: ProductosService
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


}

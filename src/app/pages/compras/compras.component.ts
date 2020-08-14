import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { VentasService } from 'src/app/services/ventas.service';
import { AuthService } from 'src/app/services/auth.service';
import { Venta } from 'src/app/models/venta.model';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})

export class ComprasComponent implements OnInit {

   titulo = "Mis Compras";
   subtitulo = "Estos son los productos que has comprado";

   ventas: Venta[];

   constructor(
      private ventasService: VentasService,
      private authService: AuthService
   ) {

   }

   ngOnInit(): void {
      let userID = this.authService.getUserOnToken()._id;
      this.ventasService.getVentasPorUsuario(userID).subscribe( res => {
         this.ventas = res['data'] as Venta[]
      });
   }



} // class compras

import { Component, OnInit } from '@angular/core';
import { VentasService } from 'src/app/services/ventas.service';
import { AuthService } from 'src/app/services/auth.service';
import { Venta } from 'src/app/models/venta.model';
import { Producto } from 'src/app/models/producto.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogElementComponent } from 'src/app/components/dialog-element/dialog-element.component';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})

export class ComprasComponent implements OnInit {

   ventas: Venta[];

   length: number;
   pageIndex: number;
   pageSize: number;
   pageSizeOptions: number[] = [5,10,25,100];

   constructor(
      private ventasService: VentasService,
      private authService: AuthService,
      public dialog: MatDialog,
      private uiService: UiService
   ) {

   }

   ngOnInit(): void {
      this.setPage({pageIndex: 0, pageSize: this.pageSizeOptions[0]}); // pageIndex = pagina donde me voy a ubicar; pageSize = limite de docs
   }

   setPage(event: any){
      let userID = this.authService.getUserOnToken()._id;

      this.ventasService.getVentasPorUsuario(userID, event).subscribe( res => {
         if(res['status'] == 'success'){
            this.ventas = res['data']['docs'] as Venta[];
            this.length = res['data']['totalDocs'] as number;

         } else {
            this.uiService.popup(res['message'], 'error');
         }
      });

   }

} // class compras

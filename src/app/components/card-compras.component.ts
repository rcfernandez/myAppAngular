import { Component, OnInit, Input } from '@angular/core';
import { Venta } from '../models/venta.model';
import { Producto } from '../models/producto.model';
import { DialogElementComponent } from './dialog-element/dialog-element.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
   selector: 'app-card-compras',
   styles: [`

      .card-compras{
         background-color: white;
         border-radius: 5px;
         box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) !important;
         margin: 20px 0 20px 0;
         transition: 0.2s;
      }

      .card-compras:hover {
         box-shadow: 0px 4px 10px 0px rgba(84,84,84,0.75) !important;
         transform: scale(1.01) ;
      }

      .col-center {
         text-align: center;
      }

      td img {
         width: 75px;
         height: 70px;
         object-fit: contain;
         margin-right: 15px;
         border-radius: 3px;
      }

      .si-pagado, .no-pagado {
         padding: 3px 10px;
         border-radius: 3px;
      }

      .no-pagado{
         color: white;
         background-color: red;

      }

      .si-pagado{
         color: white;
         background-color: green;
      }



  `],
  template: `

   <div class="row py-1 card-compras" *ngFor="let item of source">

      <div class="col-md-12">
         <h3>Comprado el: {{item.fecha | date}}</h3>
      </div>

      <div class="col-md-4" >
         <table>
            <tr>
               <td>
                  <img src="{{endpoint}}{{item.producto.imagen.filename}}" alt="">
               </td>
               <td>
                  <p style="font-size: 16px;">{{item.producto.nombre}}</p>
                  <p style="color: gray;">{{item.total | currency }} x {{item.cantidad}}</p>
               </td>
            </tr>
         </table>
      </div>

      <div class="col-md-4 col-center">

            <ng-container *ngIf="item.medio == 1">
               <p><img src="../../assets/img/efectivo_xs.png" style="height: 2.8em;"/></p>
            </ng-container>
            <ng-container *ngIf="item.medio == 2">
               <p><img src="../../assets/img/mercadopago_xs.png" style="height: 2.3em;"/></p>
            </ng-container>

            <ng-container *ngIf="item.estado == 0">
               <span class="no-pagado">No Pagado</span>
            </ng-container>
            <ng-container *ngIf="item.estado == 1">
               <span class="si-pagado">Pagado</span>
            </ng-container>

      </div>

      <div class="col-md-4" style="text-align: center;">
         <p><button mat-button (click)="openDialog(item.producto)">Volver a Comprar</button></p>
      </div>

   </div>

  `
})

export class CardComprasComponent implements OnInit {

   endpoint: string = `${environment.endpoint}/images/productos/`;
   @Input() source: Venta[];

  constructor(
   public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openDialog(producto: Producto) {
   const dialogRef = this.dialog.open(DialogElementComponent, {
     data: producto
   });
   dialogRef.afterClosed().subscribe();

 }

}

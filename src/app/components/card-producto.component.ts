import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DialogElementComponent } from './dialog-element/dialog-element.component';
import { Producto } from 'src/app/models/producto.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
   selector: 'app-card-producto',
   styles: [`

      .example-card {
         height: 100%;
         margin-bottom: 10px;
         transition: 0.2s;
      }

      .example-card:hover{
         box-shadow: 0px 4px 10px 0px rgba(84,84,84,0.75);
         transform: scale(1.02) ;
      }

      .example-card img{
         height: 200px;
         object-fit: contain;
         padding: 10px;
      }

      mat-card-actions button{
         width: 75%;
      }

      .col-card {
         padding-bottom: 2.5em;
      }

      .titulo-card-producto {

      }
      .titulo-card-producto h1 {
         font-size: 23px;
      }

      .precio-card-producto {
         font-size: 17px;
         padding: 7px 0 0 0;
         font-weight: 500;
      }

      .oferta-card-producto {
         font-size: 17px;
         color: red;
         padding: 0 0 12px 0;
      }






   `],

   template: `

   <div class="row py-2" *ngIf="productos; else templateNoData">

      <div class="col-card" [class]='class' *ngFor="let producto of productos" >

         <mat-card class="example-card" (click)="openDialog(producto)">

            <img mat-card-image class="card-home-img animate__animated animate__fadeIn" src="{{pathImage}}{{producto.imagen.filename}}" alt="{{producto.imagen.originalname}}">

            <div class="col-md-12 titulo-card-producto">
               <h1>{{ producto.nombre }}</h1>
            </div>

            <mat-card-content>
               <p>{{ producto.descripcion }}</p>
               <ng-container *ngIf="producto.oferta; else template">
                  <p class="precio-card-producto" style="text-decoration: line-through;">Precio: {{ producto.precio | currency }}</p>
                  <p class="oferta-card-producto">Oferta: {{ producto.oferta | currency }}</p>
               </ng-container>
               <ng-template #template>
                  <p class="precio-card-producto">Precio: {{ producto.precio | currency }}</p>
               </ng-template>
               <mat-card-subtitle>Categoria: {{ producto.categoria.descripcion }}</mat-card-subtitle>
               <mat-card-subtitle>Stock: {{ producto.cantidad }}</mat-card-subtitle>
            </mat-card-content>

         </mat-card>

      </div>

   </div>

   <ng-template #templateNoData>
      <p style="padding: 20px;">No hay productos para mostrar</p>
   </ng-template>

   `
})
export class CardProductoComponent implements OnInit {

  pathImage = `${environment.endpoint}/images/productos/`;

  @Input("source") productos;
  @Input('class') class: string;

   constructor(
      public dialog: MatDialog
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

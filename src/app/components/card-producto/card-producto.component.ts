import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
   selector: 'app-card-producto',
   styles: [`

      .example-card {
         height: 100%;
         margin-bottom: 10px;
      }

      .example-card:hover{
         box-shadow: $sombreado-medio;
      }

      .example-card img{
         height: 200px;
         object-fit: cover;
      }

      mat-card-actions button{
         width: 75%;
      }

      .card-col{
         margin-bottom: 30px;
      }

   `],

   template: `

      <div class="row py-3">
         <div class="col-md-4 card-col" *ngFor="let producto of productos">

            <mat-card class="example-card" >

               <img mat-card-image class="card-home-img" src="{{pathImage}}{{producto.imagen.filename}}" alt="{{producto.imagen.originalname}}">

               <mat-card-header>
                  <mat-card-title>{{ producto.nombre }}</mat-card-title>
               </mat-card-header>

               <mat-card-content>
                  <p>{{ producto.descripcion }}</p>
                  <p>Precio: {{ producto.precio | currency }}</p>
                  <mat-card-subtitle>Categoria: {{ producto.categoria.descripcion }}</mat-card-subtitle>
                  <mat-card-subtitle>Stock: {{ producto.cantidad }}</mat-card-subtitle>
               </mat-card-content>

               <mat-card-actions class="card-botones" align="center">
                  <!-- <button mat-button [routerLink]="['/checkout', producto._id]" color="primary">Comprar</button> -->
                  <!-- <button mat-button (click)="openDialog(producto)">Detalle</button> -->
                  <button mat-raised-button color="primary">Detalle</button>
               </mat-card-actions>

            </mat-card>

         </div>
      </div>


   `
})
export class CardProductoComponent implements OnInit {

  pathImage = `${environment.endpoint}/images/productos/`;
  @Input("source") productos;

  constructor() { }

  ngOnInit(): void {
  }


}

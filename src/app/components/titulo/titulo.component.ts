import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
   selector: 'app-titulo',

   styles:[`
      .titulo h1{
         padding: 50px 10px 0px 10px;
         font-weight: 300;
         font-size: 38px;
       }

       .subtitulo h3 {
         padding: 0 10px 0px 10px;
         color: gray;
         font-weight: 200;
       }
   `],

   template: `

      <div class="col-md-12 titulo">
         <h1>{{titulo}}</h1>
      </div>
      <div class="col-md-12 subtitulo">
         <h3>{{subtitulo}}</h3>
         <mat-divider></mat-divider>
      </div>

  `
})

export class TituloComponent implements OnInit {

   @Input() titulo: string;
   @Input() subtitulo: string;

  constructor() { }

  ngOnInit(): void {
  }

}

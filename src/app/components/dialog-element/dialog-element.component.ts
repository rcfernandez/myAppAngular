import { Component, OnInit, Input, Inject } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-element',
  templateUrl: './dialog-element.component.html',
  styleUrls: ['./dialog-element.component.scss']
})
export class DialogElementComponent implements OnInit {
  
  pathImage = "http://localhost:3000/images/productos/"; 
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 

  }

  ngOnInit(): void {
  }

}

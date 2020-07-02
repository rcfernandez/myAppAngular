import { Component, OnInit, Input } from '@angular/core';
import { Dato } from 'src/app/models/dato.model';

@Component({
  selector: 'app-datatabla',
  templateUrl: './datatabla.component.html',
  styleUrls: ['./datatabla.component.scss']
})
export class DatatablaComponent implements OnInit {

  @Input() source;
  @Input() columns;

  constructor() { }

  ngOnInit(): void {
  }

 
} /*clase datatabla*/


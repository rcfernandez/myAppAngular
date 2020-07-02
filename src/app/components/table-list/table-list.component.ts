import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
export class TableListComponent implements OnInit {
  @Input() source;
  @Input() routerModif;
  @Input() routerBaja;

  constructor() {}

  ngOnInit(): void {

  }
}

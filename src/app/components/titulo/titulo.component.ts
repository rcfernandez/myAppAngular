import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-titulo',
  styleUrls: ['./titulo.component.css'],
  template: `
    <div class="py-5">
      <h2>{{ this.nombre }}</h2>
    </div>
  `,
})
export class TituloComponent implements OnInit {
  @Input() nombre: string;

  constructor() {}

  ngOnInit(): void {}
}

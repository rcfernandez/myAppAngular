import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  button: Boton[];

  buttons = [
    { text: 'Inicio', link: '/' },
    { text: 'Registro', link: '/registro' },
    { text: 'Usuarios', link: '/usuarios' },
  ];

  constructor() {}

  ngOnInit(): void {}
}

export interface Boton {
  text: string;
  link: string;
}

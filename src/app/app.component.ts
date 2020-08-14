import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
   selector: 'app-root', // nombre del componente, sera llamado con <app-root></app-root>
   templateUrl: './app.component.html', // HTML del componente
   styleUrls: ['./app.component.css'], // CSS del componente
})


export class AppComponent {

   title = 'miApp';
}


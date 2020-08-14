import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
   selector: 'app-snackbar',
   templateUrl: './snackbar.component.html',
   styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {

   configSnackBar = {
      duration: 2000,
      x: "right" as any,
      y: "top" as any
   };

   @Input() message

   constructor(
      private _snackBar: MatSnackBar
   ) {

      this.openSnackBar(this.message)

   }

   ngOnInit(): void {

   }


   openSnackBar(mensaje: string) {
      this._snackBar.open(mensaje, "", {
         duration: this.configSnackBar.duration,
         horizontalPosition: this.configSnackBar.x,
         verticalPosition: this.configSnackBar.y
      });
   }



}

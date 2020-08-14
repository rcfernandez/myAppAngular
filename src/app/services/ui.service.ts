import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
   providedIn: 'root'
})
export class UiService {

   constructor(
      private snackBar: MatSnackBar,
   ) { }


   popup(msg: string, color: string) {
      if(color == 'ok') var classColor = 'color-popup-ok';
      if(color == 'error') var classColor = 'color-popup-error';

      this.snackBar.open(msg, "", {
         horizontalPosition: "center",
         verticalPosition: "top",
         duration: 3000,
         panelClass: [classColor]
      });
   }






}

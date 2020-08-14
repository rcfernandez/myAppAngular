import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';


const configSnack = environment.configSnackBar


@Injectable({
  providedIn: 'root'
})

export class InterceptorsService implements HttpInterceptor {

   constructor(
      private router: Router,
      private snackBar: MatSnackBar
   ) {

   }

  intercept(req: HttpRequest<any> , next: HttpHandler): Observable<HttpEvent<any>> {

    let token: string = localStorage.getItem("token");

    if(token){
      req = req.clone({ headers: req.headers.set("x-access-token", token) });
    }

    // req = req.clone({ headers: req.headers.set('accept','application/json') });

    return next.handle(req).pipe(
      catchError( (err : HttpErrorResponse) => {

        if(err.status === 401) {
          this.router.navigateByUrl('/login');
          this.openSnackBar("No tienes permiso (interceptor)")
        }
        return throwError(err);

      })
    )
  }


  openSnackBar(message: string) {
   this.snackBar.open( message, "", {
      horizontalPosition: configSnack.x,
      verticalPosition: configSnack.y,
      duration: configSnack.duration
   });
}

} // end class



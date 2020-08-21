import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UiService } from './services/ui.service';

@Injectable({
  providedIn: 'root'
})

export class InterceptorsService implements HttpInterceptor {

   constructor(
      private router: Router,
      private uiService: UiService
   ){
   }

  intercept(req: HttpRequest<any> , next: HttpHandler): Observable<HttpEvent<any>> {

    let token: string = localStorage.getItem("token");

    if(token){
      req = req.clone({ headers: req.headers.set("x-access-token", token) });
    }


   return next.handle(req).pipe(catchError( (error : HttpErrorResponse) =>
      {
         if(error.status === 401) {
            this.router.navigateByUrl('/login');
            this.uiService.popup("[interceptor] No tienes permiso ó caducó", 'error')
         }
         return throwError(error);
      })
   )
}


} // end class



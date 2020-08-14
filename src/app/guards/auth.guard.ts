import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

const configSnack = environment.configSnackBar

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private authServices: AuthService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(!this.authServices.isAuthenticated){
         this.openSnackBar("No tienes permiso para esta pagina (guards)");
         this.router.navigateByUrl("/")
         return false;
      }
      return true;
  }

  openSnackBar(message: string) {
     this.snackBar.open( message, "", {
        horizontalPosition: configSnack.x,
        verticalPosition: configSnack.y,
        duration: configSnack.duration
     });
  }

}
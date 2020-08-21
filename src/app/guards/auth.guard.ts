import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UiService } from '../services/ui.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private authServices: AuthService,
    private router: Router,
    private uiService: UiService
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(!this.authServices.isAuthenticated()){
         this.uiService.popup("[Guard] Debes loguearte primero",'error');
         this.router.navigateByUrl("/")
         return false;
      }
      // this.uiService.popup("[Guard] Tienes permiso de usuario :)", 'ok');
      return true;
  }

}

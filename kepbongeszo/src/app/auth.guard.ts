import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url = state.url
    return this.checkUserRole(route, url) && this.tokenService.isLoggedIn();
  }
  
  checkUserRole(route: ActivatedRouteSnapshot, url: any):boolean{
    const userRole = this.tokenService.getUser().roles;
    if (route.data.role && !userRole.includes(route.data.role)) {
      this.router.navigate(['/app/home']);
      return false;
    }
    return true;
  }
}

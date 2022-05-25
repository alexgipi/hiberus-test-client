import { DoCheck, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {
  public identity:User | undefined;
  constructor(
    private cookieService: CookieService,
    private _authService: AuthService,
    private router: Router
  ) {
    
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const cookie = this.cookieService.check('token');

    if(!cookie) {
      this.router.navigate(['/', 'login']);
    }
   
    
    return true;
  }
  
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckReferredGuard implements CanActivate {
  constructor(private cookieService: CookieService) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    try {
      const { ref = null } = route.queryParams;
      if (ref) {
        this.cookieService.set('userReferred', ref, 9999, '/');
      }
      return true;
    } catch (e) {
      return false;
    }

  }

}

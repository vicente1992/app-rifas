import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { RegisterComponent } from './modules/auth/pages/register/register.component';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<unknown> {

  constructor(private router: Router,
    private translate: TranslateService,
    private authService: RestService,
  ) {
  }
  canDeactivate(
    component: RegisterComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> | any {

    return true
  }

}

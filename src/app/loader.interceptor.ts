import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ShareService } from './modules/share.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    public shared: ShareService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('loadingCover')) {
      this.shared.loading(true);
    }
    return next.handle(req).pipe(
      finalize(() => this.shared.loading(false))
    );
  }
}

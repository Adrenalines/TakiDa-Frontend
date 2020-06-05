import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';


@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('language')) {
        const paramReq = req.clone({
          params: req.params.set(
            'locale',
            localStorage.getItem('language')
          )
        });
        return next.handle(paramReq);
      } else {
        return next.handle(req);
      }
    }
  }
}

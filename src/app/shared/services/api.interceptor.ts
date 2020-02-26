import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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

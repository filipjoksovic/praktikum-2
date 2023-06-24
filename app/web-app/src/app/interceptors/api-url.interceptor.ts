import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environment';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('api.pexels.com')) {
      return next.handle(req);
    }
    const modifiedReq = req.clone({ url: `${environment.apiBaseUrl}/${req.url}` });
    return next.handle(modifiedReq);
  }
}

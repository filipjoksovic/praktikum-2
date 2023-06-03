import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { ToasterService } from '../services/toaster.service';

@Injectable()
export class ToasterInterceptor implements HttpInterceptor {
  constructor(private toaster: ToasterService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method !== 'POST' && request.method !== 'DELETE' && request.method !== 'PUT') {
      return next.handle(request);
    } else {
      console.log('here');
      return next.handle(request).pipe(
        catchError((err) => {
          this.toaster.error('Error!', err.error.message);
          return of(err);
        }),
      );
    }
  }
}

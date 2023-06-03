import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from "../../../environment";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('login') || request.url.includes('register')) {
      console.log('Intercepted login');
      return next.handle(request);
    } else {
      console.log('Adding jwt');
      {
        const user = this.authService.currentUserValue;
        if (!user) {
          this.router.navigate(['/auth']);
        }
        const reqWithAuth = request.clone({
          url:`${environment.apiBaseUrl}/${request.url}`,
          headers: new HttpHeaders({
            Authorization: `Bearer ${user.accessToken}`,
          }),
        });

        return next.handle(reqWithAuth);
      }
    }
  }
}

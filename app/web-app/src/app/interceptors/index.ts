import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { ToasterInterceptor } from './toaster.interceptor';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  },
  { provide: HTTP_INTERCEPTORS, useClass: ToasterInterceptor, multi: true },
];

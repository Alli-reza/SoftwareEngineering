import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './services/ErrorInterceptor.service';
import { JwtInterceptor } from './services/JwtInterceptor.service';

export const HttpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';

/**
 * This will append jwt token for the http requests.
 *
 * @export
 * @class JwtInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = this.authService.getToken();
    const isApiUrl = request.url.startsWith(environment.dataApiUrl);
    if (currentUser && currentUser.length && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser}`,
        },
      });
    }
    return next.handle(request);
  }
}

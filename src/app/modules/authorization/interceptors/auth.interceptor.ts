import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, public router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | Observable<any> {
    if (this.authService.isLoggedIn()) {
      request = this.addToken(request, this.authService.getToken());
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.handle401Error(request, next, error);
        }
        return throwError(error);
      }),
    );
  }

  addToken(request, token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Token ${token}`,
      },
    });
    return request;
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler, error) {
    this.authService.logout();
    return of(error);
  }
}

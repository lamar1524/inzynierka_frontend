import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ROUTES, URLS } from '@core/consts';
import { USER_ROLE } from '@core/enums';
import { ILoginUser, IRegisterUser, IUser } from '@core/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY;

  constructor(private http: HttpClient, private router: Router) {
    this.TOKEN_KEY = 'Token';
  }

  loginUser(data: ILoginUser): Observable<IUser> {
    return this.http.post<IUser>(URLS.login, data).pipe(
      tap((response) => {
        this.saveToken(response.token);
      }),
    );
  }

  registerUser(data: IRegisterUser) {
    return this.http.post(URLS.register, data);
  }

  saveToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    sessionStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate([ROUTES.login.path]);
  }

  getCurrentUser() {
    return this.http.get<IUser>(URLS.currentUser);
  }
}

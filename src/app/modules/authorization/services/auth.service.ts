import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES, URLS } from '@core/consts';
import { USER_ROLE } from '@core/enums';
import { ILoginUser, IUser } from '@core/interfaces/user.interface';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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
      map((res: any) => ({
        id: res.id,
        email: res.email,
        first_name: res.first_name,
        last_name: res.last_name,
        image: res.image,
        role: res.is_admin ? USER_ROLE.ADMIN : res.is_lecturer ? USER_ROLE.LECTURER : USER_ROLE.USER,
      })),
    );
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
}

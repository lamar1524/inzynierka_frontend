import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from '@core/consts';
import { IUser } from '@core/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(userId: number): Observable<IUser> {
    return this.http.get<IUser>(URLS.loadProfile + userId + '/');
  }
}

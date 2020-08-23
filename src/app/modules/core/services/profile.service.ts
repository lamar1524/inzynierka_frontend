import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLS } from '../../../consts';
import { IUpdateUser, IUser } from '../../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(userId: number): Observable<IUser> {
    return this.http.get<IUser>(URLS.loadProfile + userId + '/');
  }

  editProfile(user: IUpdateUser): Observable<IUser> {
    return this.http.put<IUser>(URLS.editProfile, user);
  }
}

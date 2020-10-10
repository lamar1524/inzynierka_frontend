import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { URLS } from '../../../consts';
import { IUpdateUser, IUser } from '../../../interfaces';
import { IThread } from '../../../interfaces/message.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(userId: number): Observable<IUser> {
    return this.http.get<IUser>(URLS.loadProfile + userId + '/');
  }

  editProfile(user: IUpdateUser | FormData): Observable<IUser> {
    return this.http.put<IUser>(URLS.editProfile, user);
  }

  fetchOrCreateThread(user2Id: number): Observable<IThread> {
    return this.http.get<IThread>(URLS.getThread + user2Id);
  }
}

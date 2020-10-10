import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IResponseUsers } from '../../../interfaces';
import { map } from 'rxjs/operators';
import { URLS } from '../../../consts';
import { AuthService } from '@authorization/services';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private _httpClient: HttpClient, private _authService: AuthService) {}

  fetchUsersList(url: string): Observable<IResponseUsers> {
    return this._httpClient
      .get<any>(url)
      .pipe(
        map((results) => ({
          users: results.results.map(this._authService.mapUserRole),
          next: results.next,
          previous: results.previous,
          count: results.count,
        })),
      );
  }

  toggleUserActivity(userId: number): Observable<any> {
    return this._httpClient.put(URLS.manageUser, { userId });
  }
}

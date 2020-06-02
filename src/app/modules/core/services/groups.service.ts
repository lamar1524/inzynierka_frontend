import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { URLS } from '../consts';
import { IResponseGroups } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  constructor(private http: HttpClient) {}

  getGroups(): Observable<IResponseGroups> {
    return this.http
      .get<IResponseGroups>(URLS.usersGroups)
      .pipe(map((res: any) => ({ previous: res.previous, next: res.next, groups: res.results })));
  }
}

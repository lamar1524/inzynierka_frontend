import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { URLS } from '../consts';
import { IGroup, IPost, IResponseGroups, IResponsePosts } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  constructor(private http: HttpClient) {}

  getGroups(url: string): Observable<IResponseGroups> {
    return this.http.get<IResponseGroups>(url).pipe(map((res: any) => ({ previous: res.previous, next: res.next, groups: res.results })));
  }

  getGroup(id: number): Observable<IGroup> {
    return this.http.get<IGroup>(URLS.groupLoad + id + '/');
  }

  groupsPost(url: string): Observable<IResponsePosts> {
    return this.http
      .get<IResponsePosts>(url)
      .pipe(map((resPosts: any) => ({ next: resPosts.next, previous: resPosts.previous, posts: resPosts.results })));
  }

  addPost(post: FormData, groupId: number): Observable<IPost> {
    return this.http.post<IPost>(URLS.addPost + groupId + '/', post);
  }
}

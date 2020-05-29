import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from '@core/consts';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPost, IResponsePosts } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  loadAllPosts(url: string): Observable<IResponsePosts> {
    return this.http.get<IResponsePosts>(url).pipe(map((res: any) => ({ next: res.next, previous: res.previous, posts: res.results })));
  }

  editPost(post: FormData, postId: number): Observable<IPost> {
    return this.http.put<IPost>(URLS.postEdit + postId + '/', post);
  }
}

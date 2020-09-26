import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { URLS } from '../../../consts';
import { IComment, IPost, IResponseComments, IResponsePosts } from '../../../interfaces';

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

  deletePost(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(URLS.postDelete + id + '/');
  }

  getSinglePost(id: number): Observable<IPost> {
    return this.http.get<IPost>(URLS.postGet + id + '/');
  }

  getComments(url: string): Observable<IResponseComments> {
    return this.http
      .get<IResponseComments>(url)
      .pipe(map((res: any) => ({ previous: res.previous, next: res.next, comments: res.results })));
  }

  editComment(comment: IComment, id: number): Observable<IComment> {
    return this.http.put<IComment>(URLS.commentEdit + id + '/', comment);
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete(URLS.commentDelete + id + '/');
  }

  addComment(comment: IComment, postId: number): Observable<IComment> {
    return this.http.post<IComment>(URLS.commentAdd + postId + '/', comment);
  }
}

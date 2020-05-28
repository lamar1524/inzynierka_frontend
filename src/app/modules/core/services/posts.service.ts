import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponsePosts } from '@core/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  loadAllPosts(url: string): Observable<IResponsePosts> {
    return this.http.get<IResponsePosts>(url).pipe(map((res: any) => ({ next: res.next, posts: res.results })));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseUsers } from '@core/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private http: HttpClient) {}

  getFriendsList(url: string): Observable<IResponseUsers> {
    return this.http.get<IResponseUsers>(url).pipe(map((res: any) => ({ next: res.next, users: res.results })));
  }
}

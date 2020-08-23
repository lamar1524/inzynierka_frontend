import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { URLS } from '../../../consts';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  fetchThreadList(url?: string): Observable<any> {
    return this.http.get(url ? url : URLS.getThreadsList);
  }

  fetchMessagesList(url?: string): Observable<any> {
    return this.http.get(url ? url : URLS.getMessagesList);
  }
}

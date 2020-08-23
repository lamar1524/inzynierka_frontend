import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { URLS } from '../../../consts';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  fetchThreadList(): Observable<any> {
    return this.http.get(URLS.getThreadsList);
  }
}

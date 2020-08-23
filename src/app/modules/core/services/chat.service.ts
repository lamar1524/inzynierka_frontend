import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { URLS } from '../../../consts';
import { IResponseMessages, IResponseThreads } from '../../../interfaces/message.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  fetchThreadList(url?: string): Observable<IResponseThreads> {
    return this.http.get<IResponseThreads>(url ? url : URLS.getThreadsList);
  }

  fetchMessagesList(url?: string, threadId?: number): Observable<IResponseMessages> {
    return this.http.get<IResponseMessages>(url ? url : URLS.getMessagesList + `?threadId=${threadId}`);
  }
}

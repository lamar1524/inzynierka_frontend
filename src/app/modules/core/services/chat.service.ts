import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { URLS } from '../../../consts';
import { IMessage, IResponseMessages, IResponseThreads } from '../../../interfaces/message.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private _chatSocket$: WebSocketSubject<any>;

  constructor(private http: HttpClient) {}

  createChatSocket(id: number): void {
    this._chatSocket$ = webSocket(URLS.chatSocket + id + '/');
  }

  get chatSocket$(): Observable<IMessage> {
    return this._chatSocket$.asObservable();
  }

  sendMessage(obj: { message: string; senderId: number }): void {
    this._chatSocket$.next(JSON.stringify(obj));
  }

  closeSocketConnection(): void {
    this._chatSocket$.complete();
  }

  fetchThreadList(url?: string): Observable<IResponseThreads> {
    return this.http.get<IResponseThreads>(url ? url : URLS.getThreadsList);
  }

  fetchMessagesList(url?: string, threadId?: number): Observable<IResponseMessages> {
    console.log(url);
    return this.http.get<IResponseMessages>(url ? url : URLS.getMessagesList + `?threadId=${threadId}`);
  }
}

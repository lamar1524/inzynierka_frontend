import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';

import { ChatService, PopupService } from '@core/services';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as chatActions from '../store/chat.actions';

@Injectable()
export class ChatEffects {
  constructor(private chatService: ChatService, private actions$: Actions, private popupService: PopupService) {}

  getThreadsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(chatActions.loadThreads),
      switchMap((action) =>
        this.chatService.fetchThreadList(action.url).pipe(
          map((result) => chatActions.loadThreadsSuccess({ threads: result.results })),
          catchError(() => {
            this.popupService.error('Błąd pobierania wiadomości');
            return of(chatActions.loadMessagesFail());
          }),
        ),
      ),
    ),
  );

  getMessagesList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(chatActions.loadMessages),
      switchMap((action) =>
        this.chatService.fetchMessagesList(action.url).pipe(
          map((result) => chatActions.loadMessagesSuccess({ messages: result.results })),
          catchError(() => {
            this.popupService.error('Błąd pobierania wiadomości');
            return of(chatActions.loadMessagesFail());
          }),
        ),
      ),
    ),
  );
}

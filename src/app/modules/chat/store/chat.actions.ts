import { createAction, props } from '@ngrx/store';

export const loadThreads = createAction('[Chat] Load threads', props<{ url: string | null }>());
export const loadThreadsSuccess = createAction('[Chat] Load threads success');
export const loadThreadsFail = createAction('[Chat] Load threads fail');

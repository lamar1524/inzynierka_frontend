import { IResponsePosts } from '@core/interfaces';
import { createAction, props } from '@ngrx/store';

export const loadAllPosts = createAction('[Posts] Load posts', props<{ url: string | null }>());
export const loadAllPostsSuccess = createAction('[Posts] Load posts success', props<{ posts: IResponsePosts }>());
export const loadAllPostsFail = createAction('[Posts] Load posts fail');

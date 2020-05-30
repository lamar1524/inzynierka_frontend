import { IResponsePosts } from '@core/interfaces';
import { createAction, props, Action } from '@ngrx/store';

export const loadAllPosts = createAction('[Posts] Load posts', props<{ url: string | null }>());
export const loadAllPostsSuccess = createAction('[Posts] Load posts success', props<{ posts: IResponsePosts }>());
export const loadAllPostsFail = createAction('[Posts] Load posts fail');


export const editPost = createAction('[Posts] Edit post', props<{ post: FormData, id: number, action: Action }>());
export const editPostSuccess = createAction('[Posts] Edit post success');
export const editPostFail = createAction('[Posts] Edit post fail');

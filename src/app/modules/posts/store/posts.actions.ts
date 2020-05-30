import { createAction, props, Action } from '@ngrx/store';

import { IResponsePosts } from '@core/interfaces';

export const loadAllPosts = createAction('[Posts] Load posts', props<{ url: string | null }>());
export const loadAllPostsSuccess = createAction('[Posts] Load posts success', props<{ posts: IResponsePosts }>());
export const loadAllPostsFail = createAction('[Posts] Load posts fail');

export const editPost = createAction('[Posts] Edit post', props<{ post: FormData; id: number; refreshAction: Action }>());
export const editPostSuccess = createAction('[Posts] Edit post success');
export const editPostFail = createAction('[Posts] Edit post fail');

export const deletePost = createAction('[Posts] Delete post', props<{ id: number; refreshAction: Action }>());
export const deletePostSuccess = createAction('[Posts] Delete post success');
export const deletePostFail = createAction('[Posts] Delete post fail');
